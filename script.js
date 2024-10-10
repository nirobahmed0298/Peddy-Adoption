
let loadAllData = async (Click) => {
    let response = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    let data = await response.json();
    if(Click){
        displayAllData(data.pets.sort(function(a,b){return a.price-b.price}));
    }
    else{
        displayAllData(data.pets)
    }
}
// DisplayAll Data
let displayAllData = (pets) => {
    document.getElementById('loading').classList.add('hidden');
    let AllPets = document.getElementById('Allpets');
    let sortedSection = document.getElementById('sorted-section');
    sortedSection.innerHTML = `
            <div>
                <h1 class="text-xl font-bold">Best Deal For you</h1>
            </div>
            <div>
                <button onclick="sortedbtn()" class="btn button1">Sort by Price</button>
            </div>
    `
    if (pets.length == 0) {
        AllPets.classList.remove('grid');
        AllPets.innerHTML = `
        <div>
            <img class="ml-auto mr-auto w-52" src="./images/error.webp"/>
            <div><h1 class="text-4xl text-center font-bold text-black">No Information Available!</h1></div>
        </div>
        `
    }
    else {
        AllPets.innerHTML = " ";
        AllPets.classList.add('grid');
    }
    pets.forEach(pet => {
        let { pet_name, breed, price, date_of_birth, image, gender, petId } = pet
        let div = document.createElement('div');
        div.innerHTML = `
        <div class="card bg-base-100 w-full shadow-xl p-4 border-[1px]">
            <figure class="lg:h-[200px]">
                <img class="w-full h-full" src="${image}" alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body p-4 space-y-1">
                <h2 class="card-title text-left">${pet_name}</h2>
                <div class="text-left flex items-center gap-2"><img class="w-6 h-6"
                        src="https://img.icons8.com/?size=100&id=jLGlCGQS1SFr&format=png&color=000000"
                        alt=""><span>Breed : ${breed==null || undefined?'Not Available':breed}</span></div>
                <div class="text-left flex items-center gap-2"><img class="w-6 h-6"
                        src="https://img.icons8.com/?size=100&id=vwGXRtPWrZSn&format=png&color=000000"
                        alt=""><span>Birth : ${date_of_birth==null || undefined?'Not Available':date_of_birth}</span></div>
                <div class="text-left flex items-center gap-2"><img class="w-6 h-6"
                        src="https://img.icons8.com/?size=100&id=Kv6q3DKYDp1T&format=png&color=000000"
                        alt=""><span>Gender :${gender==null || undefined?'Not Available':gender}</span></div>
                <div class="text-left flex items-center gap-2"><img class="w-6 h-6"
                        src="https://img.icons8.com/?size=100&id=12093&format=png&color=000000"
                        alt=""><span>Price : ${price==null || undefined?'Not Available':price}</span></div>
                <div class="border-b-[1px]"></div>
                <div class="card-actions">
                    <button onclick="likedBtn(${petId})"
                        class=" btn border-[1px] border-[#0E7A81] text-[#0E7A81] px-4 rounded-md text-xs font-bold"><img
                            class="w-5 h-5"
                            src="https://img.icons8.com/?size=100&id=u8MTpAq972MG&format=png&color=000000"
                            alt="">
                    </button>
                    <button id="${petId}" onclick="adoptBtn(${petId})"
                        class="btn border-[1px] border-[#0E7A81] text-[#0E7A81] px-4 rounded-md text-sm font-bold">Adopt
                    </button>
                    <button onclick="detailsBtn(${petId})"
                        class="btn border-[1px] border-[#0E7A81] text-[#0E7A81] px-4 rounded-md text-sm font-bold">Details
                    </button>
                </div>
            </div> 
        </div>
          
  
    `
        AllPets.appendChild(div);

    });

}
// Category
let categoryBtnImg = async () => {
    let response = await fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    let data = await response.json()
    ShowcategoryBtnImages(data.categories);
}
let ShowcategoryBtnImages = (images) => {
    let ShowCategoryBtnImg = document.getElementById('Show-category-btn-img');
    images.forEach(image => {
        let { category, category_icon } = image;
        let div = document.createElement('div');
        div.innerHTML = `
            <div>
                <button id="${category}" onclick="categoriesBtn('${category}')" class="Show-category-btn button2 flex items-center justify-center gap-1 w-full">
                    <img class="w-10 h-10" src="${category_icon}" alt="">${category}
                </button>
            </div>
        `
        ShowCategoryBtnImg.appendChild(div)
    });
}
let categoriesBtn = async (category) => {
    let response = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    let data = await response.json();
    deactiveBtn();
    let activeButton = document.getElementById(`${category}`);
    activeButton.classList.add('bg-[#E6F1F2]', 'rounded-full', 'border-[#7CB7BB]');
    document.getElementById('loading').classList.remove('hidden')
    document.getElementById('Allpets').innerHTML = " ";
    setTimeout(() => {
        displayAllData(data.data);
    }, 2000);
}
// Sorted Button 
function sortedbtn(){
    loadAllData(true);
}
// Deactive button
let deactiveBtn = () => {
    let buttons = document.getElementsByClassName('Show-category-btn');
    for (let button of buttons) {
        button.classList.remove('bg-[#E6F1F2]', 'rounded-full', 'border-[#7CB7BB]')
    }
}
// Details Button
let detailsBtn = async (petId) => {
    let response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    let data = await response.json();
    let { breed, pet_name, date_of_birth, price, image, gender, pet_details } = data.petData
    let modal = document.getElementById('modal-container');
    modal.innerHTML = `
        <dialog id="my_modal_1" class="modal">
        <div class="modal-box ">
            <div class="space-y-2">
                <div class="w-full">
                    <img class="w-full rounded-md" src="${image}" alt="">
                </div>
                <h2 class="card-title text-left">${pet_name}</h2>
                <div class="text-left flex items-center gap-2"><img class="w-6 h-6"
                        src="https://img.icons8.com/?size=100&id=jLGlCGQS1SFr&format=png&color=000000"
                        alt=""><span>Breed : ${breed == undefined || null ?'Not Available':breed}</span></div>
                <div class="text-left flex items-center gap-2"><img class="w-6 h-6"
                        src="https://img.icons8.com/?size=100&id=vwGXRtPWrZSn&format=png&color=000000"
                        alt=""><span>Birth : ${date_of_birth == undefined || null ?'Not Available':date_of_birth}</span></div>
                <div class="text-left flex items-center gap-2"><img class="w-6 h-6"
                        src="https://img.icons8.com/?size=100&id=Kv6q3DKYDp1T&format=png&color=000000"
                        alt=""><span>Gender : ${gender == undefined || null ?'Not Available':gender}</span></div>
                <div class="text-left flex items-center gap-2"><img class="w-6 h-6"
                        src="https://img.icons8.com/?size=100&id=12093&format=png&color=000000" alt=""><span>Price :
                        ${price == undefined || null ?'Not Available':price}</span></div>
                <div class="border-b-[1px]"></div>
                <div class="text-left">
                    <h1 class="font-bold text-lg">Details Information</h1>
                    <p class="text-sm">${pet_details}</p>
                </div>
                <div class="modal-action">
                    <form method="dialog">
                      <button class="btn bg-[#E6F1F2] text-[#42969C] w-full my-10">Cancel</button>
                    </form>
                  </div>
            </div>
        </div>
        </div>
    </dialog>
    `
    my_modal_1.showModal();

}
// Adopt button
let adoptBtn = async(petId) => {
    let adoptModal = document.getElementById('adopt-modal-container');
    adoptModal.innerHTML = `
        <dialog id="my_modal_2" class="modal">
        <div class="modal-box">
            <img class="w-10 lg:w-32 h-10 lg:h-32 ml-auto mr-auto" src="./images/Congrates.png"/>
            <h3 class="text-xl lg:text-4xl font-bold">Congrates</h3>
            <p class="py-4 text-sm">Adoption Process is Start For Your Pet</p>
            <div id="counter" class="text-2xl lg:text-5xl font-bold"></div>
        </div>
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
        </dialog>
    `
    let counter = 3;
    let Countdown = setInterval(function () {
        document.getElementById('counter').innerText = counter;
        counter--;
        if (counter === 0) {
            clearInterval(Countdown);
            my_modal_2.close();
            document.getElementById(`${petId}`).innerText = "Adopted";
            document.getElementById(`${petId}`).classList.add('btn-disabled')
        }
    },1000);
    my_modal_2.showModal();

}
// Liked Button
let likedBtn = async(petId) => {
    let response = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`);
    let data = await response.json();
    let addImg = document.getElementById('add-img');
    let div = document.createElement('div');
    div.innerHTML = `
        <div class="w-full h-full rounded-md p-[4px]">
            <img class="w-full h-full rounded-md" src="${data.petData.image}" alt="">
        </div>
    `
    addImg.appendChild(div);
}

categoryBtnImg();

loadAllData();

