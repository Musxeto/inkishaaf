import { useEffect, useState } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase'; // Adjust the import path as necessary
import { collection, getDocs } from 'firebase/firestore';

const HomePage = () => {
  const [dates, setDates] = useState([]);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  const handleFilterChange = (e) => setFilter(e.target.value);

  const filteredDates = dates.filter(date => date.includes(filter));

  // Fetch unique dates from Firestore
  const fetchDates = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'articles'));
      const allDates = querySnapshot.docs.map(doc => doc.data().date); // Adjust according to your data structure
      
      // Create a unique set of dates and sort them in decreasing order
      const uniqueDates = [...new Set(allDates)].sort((a, b) => new Date(b) - new Date(a));
      setDates(uniqueDates);
    } catch (error) {
      console.error('Error fetching dates: ', error);
    }
  };

  useEffect(() => {
    fetchDates(); // Fetch dates on component mount
  }, []);

  return (
    <div className="min-h-screen bg-white p-4 md:p-6 font-garamond font-light">
      <Header />
      <div className="max-w-lg lg:max-w-4xl xl:max-w-6xl">
        <div className="flex items-center mb-4">
          <label htmlFor="dateFilter" className="text-lg text-black mr-2">DATE:</label>
          <input
            id="dateFilter"
            type="date"
            value={filter}
            placeholder='Select a Date'
            onChange={handleFilterChange}
            className="border-0 border-b text-black bg-gray-100 border-gray-400 focus:outline-none focus:border-gray-600 text-lg"
          />
        </div>

        <ul className="none">
          {filteredDates.map((date, index) => (
            <li 
              key={index} 
              className="p-1 cursor-pointer text-left text-lg"
              onClick={() => navigate(`/articles/${date}`)}
            >
              {date}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
