function solve() {
   let createButtonElement = document.querySelector('.site-content .create');
   let h2 = document.querySelector('main section h2');
   h2.textContent = 'Articles';

   createButtonElement.addEventListener('click', createArticle);

   function createArticle(e) {
      e.preventDefault();
      let wrapper = document.querySelector('.site-content aside form');

      // let { creator, title, category, content } = Array.from(wrapper.querySelectorAll('input, textarea'))
      //    .reduce((acc, input) => ({ ...acc, [input.id]: () => input.value }), {});

      let data = Array.from(wrapper.querySelectorAll('input, textarea'));
      let values = data.map(input => {
         let value = input.value;
         input.value = '';
         return value;
      });

      let [creator, title, category, content] = values;
      createArticleElement(creator, title, category, content);
   }

   function createArticleElement(creator, title, category, content) {
      let articleElement = document.createElement('article');

      let headingEl = document.createElement('h1');
      headingEl.textContent = title;
      articleElement.appendChild(headingEl);

      let categoryEl = createParagraphEl('Category', category);
      articleElement.appendChild(categoryEl);
      
      let creatorEl = createParagraphEl('Creator', creator);
      articleElement.appendChild(creatorEl);
      
      let contentPEL = document.createElement('p');
      contentPEL.textContent = content;
      articleElement.appendChild(contentPEL);

      (function createButtons() {
         let divWrapper = document.createElement('div');
         divWrapper.classList.add('buttons');

         let deleteButtonEl = document.createElement('button');
         deleteButtonEl.classList.add('btn', 'delete');
         deleteButtonEl.textContent = 'Delete';
         deleteButtonEl.addEventListener('click', deleteArticle);

         let archiveButtonEl = document.createElement('button');
         archiveButtonEl.classList.add('btn', 'archive');
         archiveButtonEl.textContent = 'Archive';
         archiveButtonEl.addEventListener('click', archiveArticle);

         divWrapper.appendChild(deleteButtonEl);
         divWrapper.appendChild(archiveButtonEl);

         articleElement.appendChild(divWrapper);
      })();

      let parentSectionElement = document.querySelector('main section')
      parentSectionElement.appendChild(articleElement);

      function createParagraphEl(pTitle, strongContnet) {
         let p = document.createElement('p');
         p.textContent = `${pTitle}: `;

         let strong = document.createElement('strong');
         strong.textContent = strongContnet;

         p.appendChild(strong);
         return p;
      }

      function deleteArticle(e) {
         e.preventDefault();
         let articleElement = e.target.closest('article');
         articleElement.remove();
      }

      function archiveArticle(e) {
         let heading = e.currentTarget.parentElement.parentElement.querySelector('h1').textContent;
         let liElement = document.createElement('li');
         liElement.textContent = heading;

         let olElement = document.querySelector('.archive-section ol');
         olElement.appendChild(liElement);

         deleteArticle(e);

         (function sortArticles() {
            let sortedArticles = Array.from(olElement.children).sort((a, b) => b.textContent.localeCompare(a.textContent));
            olElement.innerHTML = '';
            sortedArticles.forEach(li => olElement.appendChild(li));
         })();

      }
   }
}