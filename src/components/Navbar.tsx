import React, { useState } from 'react';
import '../assets/Navbar.css';
import SearchBox from './SearchBox';
import Menu from './common/Menu/Menu';

//import { FaRegUser } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { BsCart } from "react-icons/bs";

type MenuItem = {
  label: string;
  icon: string;
  subItems: string[];
};

const menuItems : MenuItem[] = [
  { label: 'Men', icon : '', subItems: ['T-Shirts', 'Shirts', 'Jeans', 'Shoes'] },
  { label: 'Women', icon : '', subItems: ['Kurtas', 'Tops', 'Sarees', 'Heels'] },
  { label: 'Kids', icon : '', subItems: ['T-Shirts', 'Dresses', 'Toys'] },
  { label: 'Home & Living', icon : '', subItems: ['Bedsheets', 'Cushions'] },
  { label: 'Beauty', icon : '', subItems: ['Makeup', 'Skincare'] },
];

const userMenuItems : MenuItem[] = [
  { label: 'Profile', icon : 'FaRegUser', subItems: ['Orders', 'Giftcart'] },
]
const Navbar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  return (
    <nav className="navbar">
      <div className="logo text-purple-900">EShop</div>
        <ul className="menu">
          {
            menuItems.map((item , index) => (
               <Menu item={item} key={index}/>
            ))
          }          
        </ul>
      <div className="search-box">
        <SearchBox />
      </div>
      <div className="icons">
        <div>
          {
            userMenuItems.map((item , index) => (
               <Menu item={item} key={index}/>
            ))
          }  
        </div>
        <div className="right-icons">
          <FaRegHeart/>
            Wishlist
          
        </div>
        <div className="right-icons">
          <BsCart/>
          Bag
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
