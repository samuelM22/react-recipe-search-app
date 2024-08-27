import React, {useState} from 'react';
import './RecipeSearch.css';

const RecipeSearch = () => {
    const [query, setQuery] = useState('');
    const [diet, setDiet] = useState('');
    const [cuisineType, setCuisineType] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchRecipes = async () => {
        setLoading(true)
        setError('')
        try {
            const appId = 'df9d8985';
        const appKey = '08ce904c26a3044847373e495c8fc0d1';
        const response = await fetch(
            `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}&diet=${diet}&cuisineType=${cuisineType}`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data.hits);
        }
    catch (error) {
        setError(error.message);
    } 
    finally {
        setLoading(false);
    }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchRecipes();
    };

    return (
        <div className='search-container'>
            <h2>Recipe Search</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter Ingredient or recipe name"
                />

                <select value={diet} onChange={(e) => setDiet(e.target.value)}>
                    <option value="">Select Diet</option>
                    <option value="balanced">Balanced</option>
                    <option value="high-protein">High-Protein</option>
                    <option value="low-fat">Low-Fat</option>
                    <option value="low-carb">Low-Carb</option>
                </select>

                <select value={cuisineType} onChange={(e) => setCuisineType(e.target.value)}>
                    <option value="">Select Cuisine Type</option>
                    <option value="american">American</option>
                    <option value="asian">Asian</option>
                    <option value="british">British</option>
                    <option value="caribean">Caribean</option>
                    <option value="chinese">Chinese</option>
                    <option value="french">French</option>
                    <option value="indian">Indian</option>
                    <option value="italian">Italian</option>
                    <option value="mexican">Mexican</option>
                    <option value="nigerian">Nigerian</option>    
                </select> 
                
                <button type='submit'>Search</button>
            </form>

            {loading && <p className='loading'>Loading...</p>}

            {error && <p style={{ color: 'red'}}>{error}</p>}

            {!loading && recipes.length > 0 && (
                <div className='recipe-list'>
                    
                        {recipes.map((recipe, index) => (
                            <div key={index} className='recipe-item'>
                                <h4>{recipe.recipe.label}</h4>
                                <img src={recipe.recipe.image} alt={recipe.recipe.label} />
                                <p>Calories: {Math.round(recipe.recipe.calories)}</p>
                                <a href={recipe.recipe.url} target='_blank' rel='noopener noreferrer'>
                                    View Recipe
                                </a>
                            </div>
                                                   
                            ))}
                        
                    </div>
                )}
            </div>
        );
    };
    
    export default RecipeSearch;
                                
    