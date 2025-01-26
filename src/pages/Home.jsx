import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { searchRecipes } from '../api/spoonacular';
import RecipeCard from '../components/RecipeCard';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const SearchBar = styled.div`
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex: 1;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const RecipeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchRecipes(search, category);
      setRecipes(data);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes();
  };

  return (
    <Container>
      <h1>Discover Recipes</h1>
      <SearchBar>
        <Input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="gluten-free">Gluten Free</option>
        </Select>
        <button onClick={handleSearch}>Search</button>
      </SearchBar>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <RecipeGrid>
        {recipes.map(recipe => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </RecipeGrid>
    </Container>
  );
};

export default Home;