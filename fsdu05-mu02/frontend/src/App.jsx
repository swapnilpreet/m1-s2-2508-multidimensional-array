import Carousel from './components/common/Carousel'
import Pagewrapper from './components/common/Pagewrapper';

function App() {
  const images = [
  { src: "https://picsum.photos/id/1015/600/400", alt: "Mountain Lake" },
  { src: "https://picsum.photos/id/1016/600/400", alt: "Forest Road" },
  { src: "https://picsum.photos/id/1018/600/400", alt: "Desert Dunes" },
  { src: "https://picsum.photos/id/1020/600/400", alt: "Snowy Mountain" },
  { src: "https://picsum.photos/id/1024/600/400", alt: "Golden Retriever" },
  { src: "https://picsum.photos/id/1025/600/400", alt: "Beach Sunset" },
  { src: "https://picsum.photos/id/1027/600/400", alt: "City Skyline" },
  { src: "https://picsum.photos/id/1035/600/400", alt: "River Valley" },
];
  return (
    <>
      <div className="app-container">
      <h1 className="app-title">Product Showcase</h1>
      <Pagewrapper>
         <Carousel images={images} interval={3000} />

      </Pagewrapper>
    </div>
    </>
  )
}

export default App
