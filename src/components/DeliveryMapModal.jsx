/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const torontoData = [
  { city: 'Toronto', code: 'M5H' },
  { city: 'Downtown Toronto', code: 'M5H' },
  { city: 'North York', code: 'M2N' },
  { city: 'Scarborough', code: 'M1P' },
  { city: 'Etobicoke', code: 'M9V' },
  { city: 'East York', code: 'M4C' },
  { city: 'York', code: 'M6M' },
  { city: 'The Annex', code: 'M5R' },
  { city: 'Liberty Village', code: 'M6K' },
  { city: 'Distillery District', code: 'M5A' },
  { city: 'King West', code: 'M5V' },
  { city: 'Queen West', code: 'M6J' },
  { city: 'Harbourfront', code: 'M5J' },
  { city: 'Financial District', code: 'M5H' },
  { city: 'Entertainment District', code: 'M5V' },
  { city: 'Yorkville', code: 'M4W' },
  { city: 'Rosedale', code: 'M4W' },
  { city: 'Forest Hill', code: 'M5P' },
  { city: 'Leaside', code: 'M4G' },
  { city: 'The Beaches', code: 'M4L' },
  { city: 'Leslieville', code: 'M4M' },
  { city: 'Riverdale', code: 'M4K' },
  { city: 'Danforth', code: 'M4J' },
  { city: 'Greektown', code: 'M4K' },
  { city: 'Cabbagetown', code: 'M4X' },
  { city: 'Church-Wellesley', code: 'M4Y' },
  { city: 'Kensington Market', code: 'M5T' },
  { city: 'Chinatown', code: 'M5T' },
  { city: 'Little Italy', code: 'M6J' },
  { city: 'Little Portugal', code: 'M6J' },
  { city: 'Trinity Bellwoods', code: 'M6J' },
  { city: 'Parkdale', code: 'M6K' },
  { city: 'High Park', code: 'M6P' },
  { city: 'Junction', code: 'M6N' },
  { city: 'Bloor West Village', code: 'M6S' },
  { city: 'Roncesvalles', code: 'M6R' },
  { city: 'Mimico', code: 'M8V' },
  { city: 'Long Branch', code: 'M8W' },
  { city: 'New Toronto', code: 'M8V' },
  { city: 'Alderwood', code: 'M8W' },
  { city: 'Islington-City Centre West', code: 'M9B' },
  { city: 'Kingsway', code: 'M8X' },
  { city: 'Weston', code: 'M9N' },
  { city: 'Mount Dennis', code: 'M6M' },
  { city: 'Jane and Finch', code: 'M3N' },
  { city: 'Downsview', code: 'M3K' },
  { city: 'Willowdale', code: 'M2N' },
  { city: 'Bayview Village', code: 'M2K' },
  { city: 'Don Mills', code: 'M3B' },
  { city: 'Hillcrest Village', code: 'M2H' },
  { city: 'Newtonbrook', code: 'M2M' },
  { city: 'Bathurst Manor', code: 'M3H' },
  { city: 'Lawrence Park', code: 'M4N' },
  { city: 'Bedford Park', code: 'M5M' },
  { city: 'Yonge and Eglinton', code: 'M4P' },
  { city: 'Midtown Toronto', code: 'M4S' },
  { city: 'Casa Loma', code: 'M5P' },
  { city: 'Summerhill', code: 'M4W' },
  { city: 'Deer Park', code: 'M4V' },
  { city: 'Moore Park', code: 'M4T' },
  { city: 'St. Clair West', code: 'M6C' },
  { city: 'Oakwood Village', code: 'M6E' },
  { city: 'Corso Italia', code: 'M6E' },
  { city: 'Dufferin Grove', code: 'M6H' },
  { city: 'Bloordale Village', code: 'M6H' },
  { city: 'The Junction Triangle', code: 'M6P' },
  { city: 'Regent Park', code: 'M5A' },
  { city: 'Moss Park', code: 'M5A' },
  { city: 'St. Lawrence', code: 'M5A' },
  { city: 'Corktown', code: 'M5A' },
  { city: 'CityPlace', code: 'M5V' },
  { city: 'Fort York', code: 'M5V' },
  { city: 'Harbord Village', code: 'M5S' },
  { city: 'Seaton Village', code: 'M6G' },
  { city: 'Palmerston', code: 'M6G' },
  { city: 'Wychwood', code: 'M6C' },
  { city: 'Humewood-Cedarvale', code: 'M6C' },
  { city: 'Mount Pleasant', code: 'M4P' },
  { city: 'Cliffside', code: 'M1M' },
  { city: 'Guildwood', code: 'M1E' },
  { city: 'Rouge', code: 'M1B' },
  { city: 'Malvern', code: 'M1B' },
  { city: 'Agincourt', code: 'M1S' },
  { city: 'Wexford', code: 'M1R' },
  { city: 'Birch Cliff', code: 'M1N' },
  { city: 'Clairlea', code: 'M1L' },
  { city: 'Golden Mile', code: 'M4A' },
  { city: 'Victoria Village', code: 'M4A' },
  { city: 'Thorncliffe Park', code: 'M4H' },
  { city: 'Flemingdon Park', code: 'M3C' },
  { city: 'West Hill', code: 'M1E' },
  { city: 'Port Union', code: 'M1C' },
  { city: 'Highland Creek', code: 'M1C' },
  { city: 'West Rouge', code: 'M1C' },
  { city: 'Dorset Park', code: 'M1P' },
  { city: 'Bendale', code: 'M1P' },
  { city: 'Ionview', code: 'M1K' },
  { city: 'Kennedy Park', code: 'M1K' },
  { city: 'Oakridge', code: 'M1L' },
  { city: 'Tam O’Shanter', code: 'M1T' },
  { city: 'L’Amoreaux', code: 'M1W' },
  { city: 'Pleasant View', code: 'M2J' },
  { city: 'Henry Farm', code: 'M2J' },
  { city: 'Banbury-Don Mills', code: 'M3B' },
  { city: 'Parkwoods', code: 'M3A' },
  { city: 'Amesbury', code: 'M6M' },
  { city: 'Keelesdale', code: 'M6M' },
  { city: 'Pelmo Park', code: 'M9N' },
  { city: 'Richview', code: 'M9R' },
  { city: 'Princess Gardens', code: 'M9A' },
  { city: 'Eringate', code: 'M9C' },
  { city: 'Markland Wood', code: 'M9C' },
  { city: 'Rexdale', code: 'M9W' },
  { city: 'West Deane Park', code: 'M9B' },
  { city: 'Humber Bay', code: 'M8Y' },
  { city: 'Sunnylea', code: 'M8Y' },
  { city: 'Baby Point', code: 'M6S' },
  { city: 'Lambton', code: 'M6S' },
  { city: 'Upper Beaches', code: 'M4C' }
];

const gtaData = [
  { city: 'Greater Toronto Area', code: 'L4W' },
  { city: 'Toronto', code: 'M5H' },
  { city: 'Mississauga', code: 'L5B' },
  { city: 'Brampton', code: 'L6P' },
  { city: 'Vaughan', code: 'L4K' },
  { city: 'Markham', code: 'L3R' },
  { city: 'Richmond Hill', code: 'L4B' },
  { city: 'Oakville', code: 'L6H' },
  { city: 'Burlington', code: 'L7R' },
  { city: 'Milton', code: 'L9T' },
  { city: 'Ajax', code: 'L1S' },
  { city: 'Pickering', code: 'L1V' },
  { city: 'Whitby', code: 'L1N' },
  { city: 'Oshawa', code: 'L1G' },
  { city: 'Clarington', code: 'L1C' },
  { city: 'Scarborough', code: 'M1P' },
  { city: 'North York', code: 'M2N' },
  { city: 'Etobicoke', code: 'M9V' },
  { city: 'East York', code: 'M4C' },
  { city: 'York', code: 'M6M' },
  { city: 'Downtown Toronto', code: 'M5H' },
  { city: 'King City', code: 'L7B' },
  { city: 'Aurora', code: 'L4G' },
  { city: 'Newmarket', code: 'L3Y' },
  { city: 'Stouffville', code: 'L4A' },
  { city: 'Georgetown', code: 'L7G' },
  { city: 'Caledon', code: 'L7C' },
  { city: 'Bolton', code: 'L7E' },
  { city: 'Woodbridge', code: 'L4L' },
  { city: 'Maple', code: 'L6A' },
  { city: 'Thornhill', code: 'L4J' },
  { city: 'Concord', code: 'L4K' },
  { city: 'Kleinburg', code: 'L0J' },
  { city: 'Unionville', code: 'L3R' },
  { city: 'Thornhill Woods', code: 'L4J' },
  { city: 'Cornell', code: 'L6B' },
  { city: 'Box Grove', code: 'L6B' },
  { city: 'Greensborough', code: 'L6E' },
  { city: 'Wismer', code: 'L6E' },
  { city: 'Berczy Village', code: 'L6C' },
  { city: 'Milliken', code: 'L3S' },
  { city: 'Rouge Park', code: 'M1B' },
  { city: 'Port Credit', code: 'L5G' },
  { city: 'Streetsville', code: 'L5M' },
  { city: 'Meadowvale', code: 'L5N' },
  { city: 'Erin Mills', code: 'L5M' },
  { city: 'Cooksville', code: 'L5A' },
  { city: 'Lakeview', code: 'L5E' },
  { city: 'Mineola', code: 'L5G' },
  { city: 'Malton', code: 'L4T' },
  { city: 'Churchill Meadows', code: 'L5M' },
  { city: 'Lisgar', code: 'L5N' },
  { city: 'Applewood', code: 'L4Y' },
  { city: 'Sheridan', code: 'L5K' },
  { city: 'Heartland', code: 'L5R' },
  { city: 'Bramalea', code: 'L6T' },
  { city: 'Castlemore', code: 'L6P' },
  { city: 'Springdale', code: 'L6R' },
  { city: 'Mount Pleasant', code: 'L7A' },
  { city: 'Heart Lake', code: 'L6Z' },
  { city: 'Snelgrove', code: 'L6Z' },
  { city: 'Credit Valley', code: 'L6X' },
  { city: 'Downtown Brampton', code: 'L6V' },
  { city: 'Fletcher’s Meadow', code: 'L7A' },
  { city: 'Bovaird', code: 'L6R' },
  { city: 'Alton Village', code: 'L7M' },
  { city: 'Aldershot', code: 'L7T' },
  { city: 'Roseland', code: 'L7N' },
  { city: 'The Orchard', code: 'L7L' },
  { city: 'Bronte', code: 'L6L' },
  { city: 'Glen Abbey', code: 'L6M' },
  { city: 'River Oaks', code: 'L6H' },
  { city: 'Joshua Creek', code: 'L6H' },
  { city: 'Clearview', code: 'L6J' },
  { city: 'Palermo', code: 'L6M' },
  { city: 'Old Oakville', code: 'L6J' },
  { city: 'Bronte Creek', code: 'L6M' },
  { city: 'Brooklin', code: 'L1M' },
  { city: 'Courtice', code: 'L1E' },
  { city: 'Bowmanville', code: 'L1C' },
  { city: 'Newcastle', code: 'L1B' },
  { city: 'Port Perry', code: 'L9L' },
  { city: 'Uxbridge', code: 'L9P' },
  { city: 'Beaverton', code: 'L0K' },
  { city: 'Brooklin Heights', code: 'L1M' },
  { city: 'Pickering Village', code: 'L1T' },
  { city: 'Westney Heights', code: 'L1T' },
  { city: 'Seaton', code: 'L1X' },
  { city: 'Duffin Heights', code: 'L1X' },
  { city: 'Amberlea', code: 'L1V' },
  { city: 'Liverpool', code: 'L1X' },
  { city: 'Rougemount', code: 'L1V' },
  { city: 'Taunton', code: 'L1R' },
  { city: 'Windfields', code: 'L1L' },
  { city: 'Samac', code: 'L1G' },
  { city: 'Northglen', code: 'L1H' },
  { city: 'Donevan', code: 'L1H' },
  { city: 'Lakeview Oshawa', code: 'L1J' },
  { city: 'Kedron', code: 'L1L' },
  { city: 'South Oshawa', code: 'L1H' },
  { city: 'West Whitby', code: 'L1P' },
  { city: 'Downtown Whitby', code: 'L1N' },
  { city: 'Pringle Creek', code: 'L1R' },
  { city: 'Rolling Acres', code: 'L1R' },
  { city: 'Blue Grass Meadows', code: 'L1N' },
  { city: 'Taunton North', code: 'L6A' },
  { city: 'Jefferson', code: 'L4E' },
  { city: 'Oak Ridges', code: 'L4E' },
  { city: 'Bayview Hill', code: 'L4B' },
  { city: 'Rouge Woods', code: 'L4S' },
  { city: 'Langstaff', code: 'L4C' },
  { city: 'Doncrest', code: 'L4B' },
  { city: 'Cachet', code: 'L6C' },
  { city: 'Devonsleigh', code: 'L4S' },
  { city: 'Rural Caledon', code: 'L7C' },
  { city: 'Nobleton', code: 'L0G' },
  { city: 'Schomberg', code: 'L0G' },
  { city: 'Acton', code: 'L7J' },
  { city: 'Campbellville', code: 'L0P' },
  { city: 'Carlisle', code: 'L0R' }
];

export default function DeliveryMapModal({ isOpen, onClose, initialRegion = 'Toronto' }) {
  const navigate = useNavigate();
  const [activeRegion, setActiveRegion] = useState(initialRegion);

  useEffect(() => {
    if (isOpen) {
      // setActiveRegion(initialRegion);
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [initialRegion, isOpen]);
  const displayedData = activeRegion === 'Toronto' ? torontoData : (activeRegion === 'GTA' ? gtaData : []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/10  cursor-pointer"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-7xl h-[85vh] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden z-10 pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
          >
            {/* Header Area (Inside Modal) */}
            <div className="shrink-0 flex items-center justify-between p-4  border-b border-zinc-100">
              <div className="flex items-center gap-3">
                <Zap className="w-8 h-8 text-[#FA0C83] fill-[#FA0C83]" />
                <h2 className="text-2xl  font-black text-zinc-900 tracking-tight">
                  {activeRegion === 'Toronto' ? 'Toronto' : 'GTA'} Same-Day Delivery Locations
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 shrink-0 rounded-full bg-zinc-100 text-zinc-500 hover:bg-[#FA0C83] hover:text-white flex items-center justify-center transition-all duration-300 shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grid Container (Scrollable) */}
            <div className="w-full flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8 md:p-10 relative" style={{ height: 'calc(85vh - 100px)' }}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-8">
                {displayedData.length > 0 ? (
                  displayedData.map((loc, idx) => (
                    <div
                      key={idx}
                      onClick={() => {
                        onClose();
                        navigate('/productlist',);
                      }}
                      className="flex gap-2 group cursor-pointer"
                    >
                      <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-zinc-300 group-hover:text-[#FA0C83] transition-colors" />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-zinc-800 group-hover:text-[#FA0C83] transition-colors">
                          {loc.city}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                          {loc.code}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-zinc-500 col-span-full">No locations found for this region.</p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
