import { useState, useEffect } from 'react';
import { mockLocations } from '../data/mockData';
import { useGeolocation } from './useGeolocation';
import { Location } from '../types/product';

// Haversine distance calculation
const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export const useInventory = (productId: string) => {
  const { latitude, longitude, loading: geoLoading } = useGeolocation();
  const [nearestLocation, setNearestLocation] = useState<Location | null>(null);
  const [inventory, setInventory] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (geoLoading || !latitude || !longitude) {
      setLoading(geoLoading);
      return;
    }

    // Simulate API call delay
    setTimeout(() => {
      const locationsWithDistance = mockLocations.map(location => ({
        ...location,
        distance: calculateDistance(latitude, longitude, location.lat, location.lng),
      }));

      const nearest = locationsWithDistance.reduce((prev, current) => 
        prev.distance < current.distance ? prev : current
      );

      setNearestLocation(nearest);
      setInventory(nearest.inventory[productId] || 0);
      setLoading(false);
    }, 1000);
  }, [productId, latitude, longitude, geoLoading]);

  return { nearestLocation, inventory, loading };
};