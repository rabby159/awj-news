const loadData = async () =>{
    const res = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await res.json();
    // console.log(data.data.news_category);
    const categories = data.data.news_category;
    // console.log(categories)

    const tabCategory = document.getElementById('tab-category');
    
    categories.forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `
        <a onclick="handleLoadNews('${category.category_id}')" class="tab">${category.category_name}</a>
        
        `
        tabCategory.appendChild(div);
    });
};

const selectElement = document.querySelector('.select');
selectElement.addEventListener('change', async () => {
    // Check which option is selected
    const selectedOption = selectElement.value;
    
    // Clear existing news
    const newsContainer = document.getElementById('news-container');
    // newsContainer.textContent = '';
    
    // Load news based on the selected option
    await handleLoadNews("08", selectedOption === 'Most View');
});

const handleLoadNews = async (categoryId, sortByMostView) => {
    // console.log(categoryId)
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)
    const data = await res.json();
    // console.log(data.data)
    // const arrSort = [data.data[1].total_view];
    // console.log(arrSort);

    if (sortByMostView) {
      data.data.sort((a, b) => b.total_view - a.total_view);
  }

    const newsContainer = document.getElementById('news-container');

    newsContainer.textContent = '';

    data.data?.forEach(news =>{
        // console.log(news)
        const div = document.createElement('div');
        div.classList = 'card card-side bg-base-200';
        div.innerHTML = `
        <figure><img class="w-[244px] px-4" src="${news?.image_url}"></figure>
        <div class="card-body">
          <h2 class="card-title">${news?.title}</h2>
          <p>${news?.details.slice(0,150)}</p>
          <div class="flex items-center justify-between mt-4">
            <div class="flex items-center gap-4">
              <img class="w-14 rounded-full" src="${news?.author?.img}" alt="">
              <div>
                <h4>${news?.author?.name}</h4>
                <small>${news?.author?.published_date}</small>
              </div>
            </div>          
            <div class="flex items-center gap-2">
                <i class="fa-regular fa-eye"></i>
                <p>${news?.total_view? news?.total_view : 'No view'}K</p>
            </div>            
            <div>
              <i class="fa-regular fa-star">${news?.rating?.number}</i>
            </div>            
            <div class="card-actions">
              <button onclick="handleModal('${news._id}')" class="btn btn-circle"><i class="fa-solid fa-arrow-right"></i></button>
           </div>
          </div>           
        </div>
        
        `
        newsContainer.appendChild(div);
    });
};


const handleModal = async (newsId) => {
  // console.log(newsId)
  const res = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`);
  const data = await res.json();
  // console.log(data.data[0].total_view)

  
  
  
  const modelContainer = document.getElementById('model-container');

  modelContainer.textContent = '';

  const div = document.createElement('div');
  div.innerHTML = `
    <dialog id="my_modal_1" class="modal">
    
    <form method="dialog" class="modal-box">
      <h3 class="font-medium text-base border-b-2 mb-4">${data.data[0].title}</h3>
      <img src="${data.data[0].image_url}"></img>
      <p class="py-4">News Details: ${data.data[0].details.slice(0, 200)}</p>
      <div class="modal-action">
        <button class="btn">Close</button>
      </div>
      </form>
    </dialog>
  `
  modelContainer.appendChild(div);
  const model = document.getElementById('my_modal_1');
  model.showModal();
};

loadData();
handleLoadNews('01');