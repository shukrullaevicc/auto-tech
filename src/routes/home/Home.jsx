import "animate.css";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-400 to-blue-500 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        <svg className="absolute bottom-0 left-0 w-full h-auto" viewBox="0 0 1440 320" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-opacity="0.5" d="M0,256L120,266.7C240,277,480,299,720,288C960,277,1200,235,1320,213.3L1440,192V320H1320C1200,320,960,320,720,320C480,320,240,320,120,320H0Z"/>
        </svg>
      </div>
      <div className="relative flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg max-w-lg z-10 text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-4 animate__animated animate__bounceIn animate__delay-1s">Welcome to Our Website!</h1>
        <p className="text-lg text-gray-600 mb-6 animate__animated animate__fadeIn animate__delay-2s">Experience the best with our innovative features and seamless design.</p>
        <Link to="/auth">
          <button className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transform transition-transform duration-300 ease-in-out hover:scale-105">
            Go to Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;