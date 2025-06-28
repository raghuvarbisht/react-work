
import styles from './Menu.module.css';
import * as FaIcons from 'react-icons/fa'; // FontAwesome
import * as MdIcons from 'react-icons/md'; // Material Design
import * as AiIcons from 'react-icons/ai'; // Ant Design Icons
// Add more if needed

type MenuItem = {
  label: string;
  icon: string; // e.g., 'FaRegUser', 'MdHome', 'AiFillCamera'
  subItems: string[];
};

type MenuProps = {
  item: MenuItem;
};

// Helper to get icon from pack
const getIconComponent = (iconName: string) => {
  const packs = {
    Fa: FaIcons,
    Md: MdIcons,
    Ai: AiIcons,
    // Add more packs here as needed
  };

  const prefix = iconName.slice(0, 2) ; // e.g., 'Fa' from 'FaRegUser'
  const iconPack = packs[prefix];
  const Icon = iconPack?.[iconName as keyof typeof iconPack];
  
  return Icon ? <Icon style={{ marginRight: '8px' }} /> : null;
};

const Menu = ({ item }: MenuProps) => {
  const IconComponent = getIconComponent(item.icon);

  return (
    <div className={styles.dropdown}>
      <button className={styles.dropbtn}>
        {IconComponent}
        {item?.label}
      </button>
      <div className={styles.dropdowncontent}>
        {item?.subItems.map((sub, subIndex) => (
          <a href="#" key={subIndex}>
            {sub}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Menu;
