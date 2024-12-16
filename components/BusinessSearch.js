import React, { useState } from 'react';
import { Search, MapPin, Phone, Globe, Save } from 'lucide-react';

const BusinessSearch = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [savedBusinesses, setSavedBusinesses] = useState([]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    }
    setLoading(false);
  };

  const handleSave = (business) => {
    setSavedBusinesses(prev => [...prev, business]);
  };

  const exportData = () => {
    const csv = savedBusinesses.map(business => 
      `${business.name},${business.address},${business.phone},${business.website}`
    ).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'entreprises.csv';
    a.click();
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6 bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Recherche d'Entreprises</h2>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Secteur d'activité (ex: restaurant, garage...)"
              className="flex-1 p-2 border rounded"
            />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Lieu (ex: Paris, Lyon...)"
              className="flex-1 p-2 border rounded"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-600"
            >
              <Search size={20} />
              {loading ? 'Recherche...' : 'Rechercher'}
            </button>
          </div>
          
          {savedBusinesses.length > 0 && (
            <button
              onClick={exportData}
              className="bg-green-500 text-white px-4 py-2 rounded self-end hover:bg-green-600"
            >
              Exporter en CSV
            </button>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-bold mb-4">Résultats ({results.length})</h3>
          <div className="space-y-4">
            {results.map((business, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-lg">{business.name}</h4>
                  <button
                    onClick={() => handleSave(business)}
                    className="text-blue-500 hover:text-blue-600"
                    title="Sauvegarder"
                  >
                    <Save size={20} />
                  </button>
                </div>
                <div className="mt-2 space-y-2 text-gray-600">
                  <p className="flex items-center gap-2">
                    <MapPin size={16} />
                    {business.address}
                  </p>
                  {business.phone && (
                    <p className="flex items-center gap-2">
                      <Phone size={16} />
                      {business.phone}
                    </p>
                  )}
                  {business.website && (
                    <p className="flex items-center gap-2">
                      <Globe size={16} />
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Site web
                      </a>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-4">Entreprises sauvegardées ({savedBusinesses.length})</h3>
          <div className="space-y-4">
            {savedBusinesses.map((business, index) => (
              <div key={index} className="bg-gray-50 rounded-lg shadow p-4">
                <h4 className="font-bold">{business.name}</h4>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <p>{business.address}</p>
                  {business.phone && <p>{business.phone}</p>}
                  {business.website && (
                    <a
                      href={business.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Site web
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessSearch;