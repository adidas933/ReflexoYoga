import { useEffect, useState } from 'react';
import { Box, Button, Grid, Pagination } from '@mui/material'; // Import Pagination
import { vacationService } from '../../../Services/VacationService';
import { notify } from '../../../Utils/Notify';
import { useSelector } from 'react-redux';
import { RootState, vacationActions } from '../../../Redux/store';
import { useDispatch } from 'react-redux';
import { VacationCard } from '../VacationCard/VacationCard';
import { VacationModel } from '../../../Models/VacationModel';
import { UserModel } from '../../../Models/UserModel';
import { Role } from '../../../Models/enums';

function List(): JSX.Element {
  const vacations = useSelector((state: RootState) => state.vacations);
  const user = useSelector((state: { user: UserModel | null }) => state.user);
  const dispatch = useDispatch();

  const [showLiked, setShowLiked] = useState<boolean>(false);
  const [likedVacations, setLikedVacations] = useState<VacationModel[]>([]);
  const [showActive, setShowActive] = useState<boolean>(false);
  const [showUpcoming, setShowUpcoming] = useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const vacationsPerPage = 6; // Number of vacations per page

  useEffect(() => {
    const fetchVacations = async () => {
      try {
        const vacationsData = await vacationService.getAllVacations();

        let vacationList: VacationModel[] = []

        if (Array.isArray(vacationsData)) {
          vacationList = vacationsData;
        } else {
          vacationList = vacationsData.vacations;
        }

        const sortedVacations = [...vacationList].sort(
          (a: VacationModel, b: VacationModel) => {
            return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
          }
        );
        dispatch(vacationActions.initVacations(sortedVacations));
      } catch (error) {
        notify.error('Error fetching vacations');
      }
    };
    fetchVacations();
  }, [dispatch]);

  useEffect(() => {
    if (user && user.roleId === Role.User) {
      const likedVacations = vacations.filter((vacation) =>
        vacation.usersLikes?.some((like) => like.userId === user._id)
      );
      setLikedVacations(likedVacations);
    }
  }, [vacations, user]);

  const handleToggleLiked = () => {
    setShowLiked((prev) => !prev);
  };

  const handleToggleActive = () => {
    setShowActive((prev) => !prev);
  };

  const handleToggleUpcoming = () => {
    setShowUpcoming((prev) => !prev);
  };

  const getActiveVacations = () => {
    const currentDate = new Date();
    return vacations.filter(
      (vacation) =>
        new Date(vacation.startDate) <= currentDate &&
        new Date(vacation.endDate) >= currentDate
    );
  };

  const getUpcomingVacations = () => {
    const currentDate = new Date();
    return vacations.filter(
      (vacation) => new Date(vacation.startDate) > currentDate
    );
  };

  const vacationsToDisplay = showLiked
    ? likedVacations
    : showActive
    ? getActiveVacations()
    : showUpcoming
    ? getUpcomingVacations()
    : vacations;

  // Pagination logic: Get vacations for the current page
  const indexOfLastVacation = currentPage * vacationsPerPage;
  const indexOfFirstVacation = indexOfLastVacation - vacationsPerPage;
  const currentVacations = vacationsToDisplay.slice(
    indexOfFirstVacation,
    indexOfLastVacation
  );

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <div className="List">
      <Box textAlign="center" marginBottom={2}>
        {user && user.roleId !== Role.Admin && (
          <Button variant="contained" color="primary" onClick={handleToggleLiked}>
            {showLiked ? 'Show All Vacations' : 'Show Liked Vacations'}
          </Button>
        )}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleToggleActive}
          style={{ marginLeft: '10px' }}
        >
          {showActive ? 'Show All Vacations' : 'Show Ongoing Vacations'}
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleToggleUpcoming}
          style={{ marginLeft: '10px' }}
        >
          {showUpcoming ? 'Show All Vacations' : 'Show Upcoming Vacations'}
        </Button>
      </Box>

      <Grid container spacing={2} justifyContent="center">
        {currentVacations.map((vacation) => (
          <Grid item xs={12} sm={6} md={4} key={vacation._id}>
            <VacationCard {...vacation} />
          </Grid>
        ))}
      </Grid>

      <Box display="flex" justifyContent="center" marginTop={2}>
        <Pagination
          count={Math.ceil(vacationsToDisplay.length / vacationsPerPage)} // Total pages
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </div>
  );
}

export default List;
