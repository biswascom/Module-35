
// Load data with fetch
const loadPhone = async(searchText,dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayPhone(data.data, dataLimit);
        // console.log(data.data);
    }
    catch (error) {
        console.log(error);
    }
};

// Display loaded data
const displayPhone = (phones, dataLimit) => {
    const displayContainer = document.getElementById('display-container');
    displayContainer.innerHTML = '';

    
    
    // No phone found display
    const noPhoneFound = document.getElementById('no-found');
    if (phones.length === 0) {
        noPhoneFound.classList.remove('hidden');
    }
    else {
        noPhoneFound.classList.add('hidden');
    };
    
    // show more option
    const showMoreButton = document.getElementById('btn-show-more');
    if(dataLimit && phones.length > 6){
        phones = phones.slice(0, 6);
        showMoreButton.classList.remove('hidden');
    } 
    else{
        showMoreButton.classList.add('hidden');
    };
    
    // Display loaded data rest portion
    phones.forEach(phone => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card card-compact w-96 bg-base-100 shadow-xl">
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
        <h2 class="card-title">Brand: ${phone.brand}</h2>
        <h2 class="card-title">Brand: ${phone.phone_name}</h2>
        <div class="justify-end">
        <label onclick="loadPhoneDetails('${phone.slug}')" for="my-modal" class="btn">Details</label>
        </div>
        `;
        displayContainer.appendChild(div);
    });

    // loading ends here
    loading(false);
};

// Display single data in Modal
const loadPhoneDetails = async (id) => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        // console.log(data.data);
        const modalDetails = document.getElementById('modal-details');
        modalDetails.innerHTML = `
        <h3 id="phone-title" class="font-bold text-lg">Model: ${data.data.name}</h3>
        <h3 id="phone-title" class="font-bold text-lg">Release: ${data.data.releaseDate ? data.data.releaseDate : 'Coming Soon'}</h3>
        <p class="pt-2">Storage: ${data.data.mainFeatures.storage}</p>
        <p class="pt-1">Display: ${data.data.mainFeatures.displaySize}</p>
        <p class="pt-1">Sensor: ${data.data.mainFeatures.sensors}</p>
        <div class="modal-action">
        <label for="my-modal" class="btn">Close</label>
        </div>
        `;
    }
    catch (error) {
        console.log(error);
    }
};

// common search function
const commonSearch = (dataLimit) =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;

    // (Search field er value empty kore dile show more button ti kaj korbe na. karon show more button click korle tar agei search input field er value empty kore felar command diye rekha hoyese tai ki search kora hobe ta ar lekha thakse na search input field e. ei karone korno value passe na bole no found condition enable hoye jasse abong no phone found message show korse.)

    // searchField.value = '';
    loadPhone(searchText, dataLimit);
}
// Search section
document.getElementById('btn-search').addEventListener('click', function () {
    // loading start here
    loading(true);
    commonSearch(6);
});

// enter press to search
document.getElementById("search-field")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        loading(true);
        commonSearch(6);
    }
});

// Loading Function here
const loading = (isLoading) => {
    const loadingStatus = document.getElementById('loading');
    if (isLoading) {
        loadingStatus.classList.remove('hidden');
    }
    else {
        loadingStatus.classList.add('hidden');
    };
};

document.getElementById('btn-show-more').addEventListener('click', function(){
    commonSearch();
})

loadPhone();