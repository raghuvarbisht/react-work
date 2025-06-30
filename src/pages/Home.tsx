import Carousel from "../components/common/Carousel/Carousel";
const slides = [
    {
      image: "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2025/6/23/e3ac3104-c764-4b65-974f-17d1dddf284b1750699275694-clearance-sale-desktop-KV.gif",
      caption: "Summer Sale"
    },
    {
      image: "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/7/25/9be788ff-39a4-4214-99d0-fc97505aae5a1658752545685-USPA_Desk_Banner.jpg",
      caption: "New Arrivals"
    },
    {
      image: "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/6/27/53b4daed-cd2c-4111-86c5-14f737eceb351656325318973-Handbags_Desk.jpg",
      caption: "Big Discounts"
    }
  ];

const Home = () => {
    return (
        <div>
            <div style={{width: "100%", padding:"10px"}}>
                <Carousel slides={slides} interval={3000} />
            </div>
        </div>
    )
}

export default Home