
let loadAllData = async () => {
    let response = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
    let data = await response.json();
    displayAllData(data.pets)
}
// DisplayAll Data
let displayAllData = (pets) => {
    let AllPets = document.getElementById('Allpets');
    pets.forEach(pet => {
    let{pet_name,breed,price,date_of_birth,image,gender}=pet
    let div = document.createElement('div');
    div.innerHTML = `
        <div class="card bg-base-100 shadow-xl p-4 border-[1px]">
            <figure>
                <img src="${image}" alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body p-4 space-y-1">
                <h2 class="card-title text-left"> ${pet_name}</h2>
                <div class="text-left flex items-center gap-2"><img class="w-6 h-6"
                        src="https://img.icons8.com/?size=100&id=jLGlCGQS1SFr&format=png&color=000000"
                        alt=""><span>Breed : ${breed}</span></div>
                <div class="text-left flex items-center gap-2"><img class="w-6 h-6"
                        src="https://img.icons8.com/?size=100&id=vwGXRtPWrZSn&format=png&color=000000"
                        alt=""><span>Birth : ${date_of_birth}</span></div>
                <div class="text-left flex items-center gap-2"><img class="w-6 h-6"
                        src="https://img.icons8.com/?size=100&id=Kv6q3DKYDp1T&format=png&color=000000"
                        alt=""><span>Gender : ${gender}</span></div>
                <div class="text-left flex items-center gap-2"><img class="w-6 h-6"
                        src="https://img.icons8.com/?size=100&id=12093&format=png&color=000000"
                        alt=""><span>Price : ${price}</span></div>
                <div class="border-b-[1px]"></div>
                <div class="card-actions flex gap-3">
                    <button
                        class="btn border-[1px] border-[#0E7A81] text-[#0E7A81] px-4 rounded-md text-xs font-bold"><img
                            class="w-5 h-5"
                            src="https://img.icons8.com/?size=100&id=u8MTpAq972MG&format=png&color=000000"
                            alt="">
                    </button>

                    <button
                        class="btn border-[1px] border-[#0E7A81] text-[#0E7A81] px-4 rounded-md text-sm font-bold">Buy
                        Now
                    </button>
                    <button
                        class="btn border-[1px] border-[#0E7A81] text-[#0E7A81] px-4 rounded-md text-sm font-bold">Details
                    </button>
                </div>
            </div> 
            </div>     
    `
    AllPets.appendChild(div);

    });

}

loadAllData();

