import { List, ListItem, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";

function DrawerMenu({
  items,
  onClose,
}: {
  items: { label: string; to: string }[];
  onClose: () => void;
}) {
  return (
    <List sx={{ width: 250, padding: 2 }}>
      {items.map((item) => (
        <ListItem
          key={item.label}
          component={NavLink}
          to={item.to}
          onClick={onClose}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            '&:hover': { backgroundColor: '#BBDEFB' },
          }}
        >
          <ListItemText primary={item.label} sx={{ textAlign: 'center' }} />
        </ListItem>
      ))}
    </List>
  );
}

export default DrawerMenu;
