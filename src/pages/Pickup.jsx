import { useNavigate } from "react-router-dom"
import leftArrow from '../assets/icons/left-arrow.png'
import CartIcon from "../components/CartIcon"
import { useState, useEffect } from "react"
import { stores } from '../jsFile/List'
import rightA from '../assets/icons/right-arrow.png'
import Cart from '../motionPages/Cart';
import { useSelector } from "react-redux"

const getDistanceInMiles = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const toRad = deg => deg * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceInKm = R * c;
  return distanceInKm * 0.621371;
};

const Pickup = () => {
  const [input, setInput] = useState('')
  const [sortedStores, setSortedStores] = useState([])
  const [hasFetched, setHasFetched] = useState(false)
  const navigate = useNavigate()
  const [showCart, setShowCart] = useState(false)
  const cartNumb = useSelector(state => state.cart)

  useEffect(() => {
    const withIndex = stores.map((store, i) => ({
      ...store,
      originalIndex: i,
      distance: null
    }));
    setSortedStores(withIndex);
    setHasFetched(true);
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (input.length < 3) {
        return;
      }

      fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(input)}&format=json`)
        .then(res => res.json())
        .then(data => {
          if (data.length === 0) return;

          const { lat, lon } = data[0];
          const userLat = parseFloat(lat);
          const userLon = parseFloat(lon);

          const sorted = stores
            .map((store, i) => ({
              ...store,
              distance: getDistanceInMiles(userLat, userLon, store.lat, store.lng),
              originalIndex: i
            }))
            .sort((a, b) => a.distance - b.distance);

          setSortedStores(sorted);
          setHasFetched(true);
        })
        .catch(err => {
          console.error('Geolocation error:', err);
        });

    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [input]);

    const handlePickup = (id) => {
      navigate(`/location/${id}`)
    }

    const handleBack = () => navigate(-1)

  return (
    < div className="pageBg">
          <div className="d-flex checkTitles">
            <h1 
              className="titles gap-3"
              onClick={handleBack}
            >
              <div>
                <img src={leftArrow} className="arrowPick" />
              </div>
              <span className="headDelP">Pickup Location</span>     
            </h1>
            {
              cartNumb.length > 0 ? (
                <div className='divBtn' onClick={() => setShowCart(true)}>
                  <button className='topBtn'>
                    <CartIcon />
                    <p className='cartText'>View Cart</p>
                  </button>
                </div>
              ) : (
                <div></div>
              )
            }
            {showCart && <Cart onClose={() => setShowCart(false)} />}
          </div>
          <div className="contPickup">
            <div className="container">
                <input
                  type="text"
                  placeholder="City, State, or Zipcode"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="inputLoc"
                />
            </div>
            <div className="location">
              {hasFetched && sortedStores.length > 0 && (
                  <div>
                    {sortedStores.map((store, index) => (
                      <div 
                        key={index} 
                        className="store-list"
                        onClick={() => handlePickup(store.originalIndex)}
                      >
                        <div className="locationList">
                          <img src={store.icon} className="iconStore"/>
                          <div className="storeDetails">
                            <h6>
                              <strong>{store.name}</strong>
                            </h6>
                            {store.distance !== null && <p className="storeDistance">{store.distance.toFixed(1)} miles away</p>}
                          </div>
                          <a>
                            <div className='modeD'>
                                <img src={rightA} className="arrowLoc" />
                            </div>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </div>
            <div className="empty"></div>
          </div>
    </div>
  )
}

export default Pickup