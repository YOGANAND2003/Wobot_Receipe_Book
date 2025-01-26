import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { db, auth } from '../firebase';
import { collection, query, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const RecipeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const RecipeCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
`;

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!auth.currentUser) return;

      try {
        const q = query(collection(db, `users/${auth.currentUser.uid}/favorites`));
        const querySnapshot = await getDocs(q);
        const favoritesData = [];
        querySnapshot.forEach((doc) => {
          favoritesData.push({ id: doc.id, ...doc.data() });
        });
        setFavorites(favoritesData);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Container>
      <h1>My Favorite Recipes</h1>
      {favorites.length === 0 ? (
        <p>No favorite recipes yet.</p>
      ) : (
        <RecipeGrid>
          {favorites.map((recipe) => (
            <RecipeCard key={recipe.id}>
              <Image src={recipe.image} alt={recipe.title} />
              <h3>{recipe.title}</h3>
              <Link to={`/recipe/${recipe.recipeId}`}>View Recipe</Link>
            </RecipeCard>
          ))}
        </RecipeGrid>
      )}
    </Container>
  );
};

export default Favorites;