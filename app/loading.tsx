import Image from "next/image";
import loader from '@/assets/loader.gif';


const LoadingPage = () => {
    return (
        <div style={{
            height: '100vh',
            width: '100vw'
            }} className="flex-center" >
            <Image src={loader} height={150} width={150} alt="Loading..." />

        </div>
    );
}

export default LoadingPage;