export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/writing', label: 'Writing' },
  { href: '/about', label: 'About' },
];

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

export function formatPosts(posts, {
  filterOutDraft = true,
  filterOutFuturePost = true,
  sortByDate = true,
  limit = undefined
} = {}){
  

  const filteredPosts = posts.reduce((acc, post) => {
    const { date, draft } = post.frontmatter
    if(filterOutDraft && draft) return acc;

    if(filterOutFuturePost && new Date(date) > new Date()) return acc;

    acc.push(post)
    return acc
  }, [])

  if(sortByDate){
    filteredPosts.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
  }else{
    filteredPosts.sort(() => Math.random() - 0.5)
  }

  if(typeof limit === "number"){
    return filteredPosts.slice(0, limit)
  }

  console.log(filteredPosts);
  return filteredPosts
  
  
}