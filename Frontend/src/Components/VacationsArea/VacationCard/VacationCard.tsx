import { VacationModel } from '../../../Models/VacationModel';
import './VacationCard.css';
import { useEffect, useState } from 'react';
import { likeService } from '../../../Services/LikeService';
import { useSelector } from 'react-redux';
import { UserModel } from '../../../Models/UserModel';
import { Role } from '../../../Models/enums';
import EditVacationForm from '../Edit/EditVacation';
import { vacationService } from '../../../Services/VacationService';
import { useNavigate } from 'react-router-dom';
import { notify } from '../../../Utils/Notify';
import { LikeModel } from '../../../Models/LikeModel';

// MUI Components
import { Card, CardContent, CardMedia, Typography, Button, IconButton, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export function VacationCard(props: VacationModel): JSX.Element {
  const navigate = useNavigate();
  const user = useSelector((state: { user: UserModel | null }) => state.user);

  const [likesArray, setLikesArray] = useState<LikeModel[]>([]);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likesCount, setLikesCount] = useState(props.usersLikes?.length || 0);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);  // New state for read more


  useEffect(() => {
    const fetchLikes = async () => {
      if (user && user.roleId === Role.User) {
        const likes = await likeService.getAllLikes();
        setLikesArray(likes);
        const userLiked = props.usersLikes?.some((like) => like.userId === user._id) || false;
        setIsLiked(userLiked);
      } else if (!user) {
        notify.error('Please login to see vacations');
        navigate('/Login');
      }
    };
    fetchLikes();
  }, [user, props.usersLikes, navigate]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleLikeButton = async (vacationId: string) => {
    try {
      if (isLiked) {
        const likedVacationIdContainer = likesArray.filter(
          (like) => like.userId === user._id && like.vacationId === vacationId
        );
        const likeVacationId = likedVacationIdContainer[0]._id;
        await likeService.deleteLike(likeVacationId);
        setLikesArray(likesArray.filter((like) => like._id !== likeVacationId));
        setLikesCount((prev) => prev - 1);
        setIsLiked(false);
      } else {
        const like: LikeModel = {
          vacationId,
          userId: user._id,
        };
        const addedLike = await likeService.addLike(like);
        setLikesArray([...likesArray, addedLike]);
        setLikesCount((prev) => prev + 1);
        setIsLiked(true);
      }
    } catch (error) {
      console.log('Error handling like:', error);
    }
  };

  const deleteVacation = async (vacationId: string) => {
    if (window.confirm('Are you sure you want to delete this vacation?')) {
      try {
        await vacationService.deleteVacation(vacationId);
        console.log('Vacation deleted successfully.');
      } catch (error) {
        console.error('Failed to delete vacation:', error);
      }
    }
  };

  const openEditForm = () => {
    setIsEditing(true);
  };

  const closeEditForm = () => {
    setIsEditing(false);
  };
  const imageUrl = typeof props.image === "string" ? props.image : "";

  const truncateDescription = (description: string, length: number): string => {
    return description.length > length ? description.substring(0, length) + '...' : description;
  };

  return (
    <Card sx={{ maxWidth: 345, margin: '20px', position: 'relative' }}>
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={props.destination}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.destination}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {/* Conditionally render full or truncated description */}
          {showMore ? props.description : truncateDescription(props.description, 100)}
          {/* Show the Read More / Read Less button if description is too long */}
          {props.description.length > 100 && (
            <Button
              size="small"
              onClick={() => setShowMore(!showMore)}
              color="primary"
            >
              {showMore ? 'Read Less' : 'Read More'}
            </Button>
          )}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Start Date: {formatDate(props.startDate)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          End Date: {formatDate(props.endDate)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Price: ${props.price}
        </Typography>

        {user && user.roleId === Role.Admin ? (
          <>
            <Button variant="contained" color="primary" onClick={openEditForm}>
              Edit
            </Button>
            <Button variant="contained" color="secondary" onClick={() => deleteVacation(props._id)}>
              Delete
            </Button>
          </>
        ) : (
          user && (
            <Box display="flex" alignItems="center">
              <IconButton onClick={() => handleLikeButton(props._id)}>
                {isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                {likesCount}
              </Typography>
            </Box>
          )
        )}
      </CardContent>

      {isEditing && <EditVacationForm vacation={props} onClose={closeEditForm} />}
    </Card>
  );
}
