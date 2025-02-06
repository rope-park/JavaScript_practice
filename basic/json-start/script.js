async function populate() {
    const requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
    const request = new Request(requestURL);

    const response = await fetch(request); // JSON을 가져오기 위해 fetch()를 사용 - 리소스 검색을 위한 네트워크 요청
    const superHeroes = await response.json();
    // 위 한 줄을 아래 두 줄로 대체 가능.
    // const superHeroesText = await response.text(); // JSON이 아닌 텍스트를 가져오기 위해 text()를 사용
    // const superHeroes = JSON.parse(superHeroesText); // JSON 텍스트를 JavaScript 객체로 변환

    populateHeader(superHeroes);
    populateHeroes(superHeroes);
}

// JSON 데이터를 사용하여 헤더와 히어로 섹션을 채우는 함수
function populateHeader(obj) {
    const header = document.querySelector('header');
    const h1 = document.createElement('h1');
    h1.textContent = obj.squadName;
    header.appendChild(h1);

    const myPara = document.createElement('p');
    myPara.textContent = `Hometown: ${obj.homeTown} // Formed: ${obj.formed}`;
    header.appendChild(myPara);
}

// JSON 데이터를 사용하여 히어로 섹션을 채우는 함수
function populateHeroes(obj) {
    const section = document.querySelector('section');
    const heroes = obj.members;

    for (const hero of heroes) {
        const article = document.createElement('article');
        const h2 = document.createElement('h2');
        const myPara1 = document.createElement('p');
        const myPara2 = document.createElement('p');
        const myPara3 = document.createElement('p');
        const list = document.createElement('ul');

        h2.textContent = hero.name;
        myPara1.textContent = `Secret identity: ${hero.secretIdentity}`;
        myPara2.textContent = `Age: ${hero.age}`;
        myPara3.textContent = 'Superpowers:';

        const superPowers = hero.powers;
        for (const power of superPowers) {
            const listItem = document.createElement('li');
            listItem.textContent = power;
            list.appendChild(listItem);
        }

        article.appendChild(h2);
        article.appendChild(myPara1);
        article.appendChild(myPara2);
        article.appendChild(myPara3);
        article.appendChild(list);

        section.appendChild(article);
    }
}

populate();