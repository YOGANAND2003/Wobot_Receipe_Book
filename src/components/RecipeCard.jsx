import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem;
  width: 300px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
`;

const Title = styled.h3`
  margin: 1rem 0;
  color: #333;
`;

const Description = styled.p`
  color: #666;
  margin-bottom: 1rem;
`;

const Rating = styled.div`
  color: #f8c51c;
  margin-bottom: 1rem;
`;

const RecipeCard = ({ recipe }) => {
  return (
    <Card>
      <Image src={recipe.image} alt={recipe.title} />
      <Title>{recipe.title}</Title>
      <Description>{recipe.summary.substring(0, 100)}...</Description>
      <Rating>
        {[...Array(5)].map((_, i) => (
          <span key={i}>★</span>
        ))}
        ({recipe.aggregateLikes} likes)
      </Rating>
      <Link to={`/recipe/${recipe.id}`}>View Recipe</Link>
    </Card>
  );
};

export default RecipeCard;