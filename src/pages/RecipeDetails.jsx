import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getRecipeDetails } from '../api/spoonacular';
import { db, auth } from '../firebase';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
`;

const Image = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 1rem;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await getRecipeDetails(id);
        setRecipe(data);
        if (auth.currentUser) {
          const docRef = doc(db, `users/${auth.currentUser.uid}/favorites/${id}`);
          const docSnap = await getDoc(docRef);
          setIsFavorite(docSnap.exists());
        }
      } catch (err) {
        setError('Failed to fetch recipe details');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const toggleFavorite = async () => {
    if (!auth.currentUser) {
      alert('Please login to save favorites');
      return;
    }

    const docRef = doc(db, `users/${auth.currentUser.uid}/favorites/${id}`);
    
    try {
      if (isFavorite) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, {
          recipeId: id,
          title: recipe.title,
          image: recipe.image
        });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error updating favorite:', error);
    }
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <Container>
      <Image src={recipe.image} alt={recipe.title} />
      <Title>{recipe.title}</Title>
      
      <button onClick={toggleFavorite}>
        {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
      </button>

      <Section>
        <h2>Ingredients</h2>
        <ul>
          {recipe.extendedIngredients.map((ingredient, index) => (
            <li key={index}>{ingredient.original}</li>
          ))}
        </ul>
      </Section>

      <Section>
        <h2>Instructions</h2>
        <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} />
      </Section>

      <Section>
        <h2>Additional Information</h2>
        <p>Ready in: {recipe.readyInMinutes} minutes</p>
        <p>Servings: {recipe.servings}</p>
        <p>Health Score: {recipe.healthScore}</p>
      </Section>
    </Container>
  );
};

export default RecipeDetails;