

export default function remapRecipes(recipes){
  return recipes.map(recipe => {
    let category = recipe.attributes.category || null;

    return {
      id: recipe.id,
      name: recipe.attributes.name,
      description: recipe.attributes.description,
      duration: recipe.attributes.duration,
      servings: recipe.attributes.servings,
      img: recipe.attributes.img,
      likes: recipe.attributes.likes,
      category: category ? {
        name: category.data.attributes.name,
        slug: category.data.attributes.slug,
      } : null,

    }
  })
}
