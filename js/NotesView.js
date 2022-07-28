export default class NotesView {
    constructor(
        root,
        { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}
    ) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        this.root.innerHTML = `
            
           <div class="title-description">
           <div class="name-div">
           <input class="project-name" type="text"></input> 
           <span><svg viewBox="0 0 100 100" class="ItemTitle_iconEdit-rW2EJ"><path d="M24.56 92.536L0 100l7.453-24.583c6.356-.244 17.322 10.792 17.107 17.119zM96.617 32.082l-.475.471L67.383 3.766l.472-.472c12.927-12.94 42.016 15.517 28.762 28.788zM61.64 9.516l28.758 28.785-46.303 46.345c-1.222 1.221-2.234.884-2.234.884l2.314-15.356-14.454.074.072-14.468-15.342 2.312s-.34-1.011.883-2.234L61.64 9.516z"></path></svg></span>
           </div>
           <div class="project-desc">
           <textarea class="project-description" type="text"></textarea>
           </div>

           <button class="notes__add" type="button">
           
           create a project! </button>
           
           </div>

           <div class="white">
           <h1>Save your roughwork locally </h1>
           <h2 style="font-size:28px;">explore more </h2>
          
           
           </div>


           
            <div class="notes__preview">
            <div>
                <div class="code-editor htmlcoder">


                <div class="code-type"><i class="fab fa-html5"
                    style="color:#ff3c41;"></i> HTML
                </div>
                   
                
                <textarea class="notes__title" id="html" type="text" spellcheck="false"></textarea>

                <div class="copyboard" id="3" onclick="clipboard1()"><i class="fi-rr-copy-alt"></i>clipboard</div>

                </div>
                

                <div class="code-editor csscoder">
                <div class="code-type"> <i class="fab fa-css3-alt"
                    style="color:#0ebeff;"></i> CSS
                </div>
                <textarea id="css" spellcheck="false" class="notes__body"> </textarea>
                <div class="copyboard" id="2" onclick="clipboard2()"><i class="fi-rr-copy-alt"></i>clipboard</div>
                </div>

                <div class="code-editor jscoder">
                <div class="code-type"><i class="fab fa-js"
                    style="color:#fcd000;"></i> JS
                </div>
                <textarea id="js" spellcheck="false" class="notes__body1"> </textarea>
                <div class="copyboard" id="1" onclick="clipboard()"><i class="fi-rr-copy-alt"></i>clipboard</div>
                </div>
            </div>
            </div>


            <div class="notes__sidebar">
                <h1>your project list </h1>
                <div class="notes__list"></div>
            </div>


            <footer data-aos="fade-in" data-aos-delay="50" data-aos-duration="1000">


            <div class="foot-col-1">
                <h3> Build & Test</h3>
    
                <a href="home.html" style="margin-top: 20px;"><i class="fas fa-home"></i> Home-Roughcode</a>
                <a href="codeeditor.html"><i class="fab fa-html5"></i> General Code Editor</a>
                <a href="codeeditoradvance.html"><i class="fas fa-edit"></i> Advanced Code Editor</a>
                <a href="color.html"><i class="fas fa-palette"></i> Gradient Background Colors</a>
                <a href="savework.html"><i class="fas fa-bookmark"></i> Save your roughwork </a>
    
            </div>
    
            <div class="foot-col-2">
                <h3>Contact Us</h3>
                <p><i class="fas fa-envelope"></i> E-mail: <a href="mailto:roughcode2021@gmail.com"
                        style="text-decoration: none;color: #ffffff;">roughcode2021@gmail.com</a> </p>
    
            </div>
    
            <div class="foot-col">
                <h3> ROUGHC<i class="fas fa-code" style="color: rgb(52, 236, 15);" id="light"></i>DE</h3>
    
    
    
                <p><i class="fab fa-dev"></i> Design and devoloped by ROUGHCODE</p>
    
            </div>
    
    
        </footer>
        <div class="lastpart">
            <p><i class="far fa-copyright"></i> ROUGHCODE 2021
                All Right Reserved</p>
        </div>
        `;

        const btnAddNote = this.root.querySelector(".notes__add");
        const projectName = this.root.querySelector(".project-name");
        const projectDesc = this.root.querySelector(".project-description");
        const inpTitle = this.root.querySelector(".notes__title");
        const inpBody = this.root.querySelector(".notes__body");
        const inpBody1 = this.root.querySelector(".notes__body1");

        btnAddNote.addEventListener("click", () => {
            this.onNoteAdd();
        });

        [projectName, projectDesc, inpTitle, inpBody, inpBody1].forEach(
            (inputField) => {
                inputField.addEventListener("blur", () => {
                    const updatedName = projectName.value.trim();
                    const updatedDesc = projectDesc.value.trim();
                    const updatedTitle = inpTitle.value.trim();
                    const updatedBody = inpBody.value.trim();
                    const updatedBody1 = inpBody1.value.trim();

                    this.onNoteEdit(
                        updatedName,
                        updatedDesc,
                        updatedTitle,
                        updatedBody,
                        updatedBody1
                    );
                });
            }
        );

        this.updateNotePreviewVisibility(false);
    }

    _createListItemHTML(id, name, desc, title, body, body1, updated) {
        const MAX_BODY_LENGTH = 60;

        return `
           
            <div class="notes__list-item" data-note-id="${id}">
                <div class="notes__small-title">${name}</div>
                <div class="notes__small-desc">${desc}</div>
               
                <div class="notes__small-updated">
                    ${updated.toLocaleString(undefined, {
            dateStyle: "full",
            timeStyle: "short",
        })}
                </div>
            </div>
        `;
    }

    updateNoteList(notes) {
        const notesListContainer = this.root.querySelector(".notes__list");

        // Empty list
        notesListContainer.innerHTML = "";

        for (const note of notes) {
            const html = this._createListItemHTML(
                note.id,
                note.name,
                note.desc,
                note.title,
                note.body,
                note.body1,
                new Date(note.updated)
            );

            notesListContainer.insertAdjacentHTML("beforeend", html);
        }

        // Add select/delete events for each list item
        notesListContainer
            .querySelectorAll(".notes__list-item")
            .forEach((noteListItem) => {
                noteListItem.addEventListener("click", () => {
                    this.onNoteSelect(noteListItem.dataset.noteId);
                });

                noteListItem.addEventListener("dblclick", () => {
                    const doDelete = confirm(
                        "Are you sure you want to delete this note?"
                    );

                    if (doDelete) {
                        this.onNoteDelete(noteListItem.dataset.noteId);
                    }
                });
            });
    }

    updateActiveNote(note) {
        this.root.querySelector(".project-name").value = note.name;
        this.root.querySelector(".project-description").value = note.desc;
        this.root.querySelector(".notes__title").value = note.title;
        this.root.querySelector(".notes__body").value = note.body;
        this.root.querySelector(".notes__body1").value = note.body1;

        this.root.querySelectorAll(".notes__list-item").forEach((noteListItem) => {
            noteListItem.classList.remove("notes__list-item--selected");
        });

        this.root
            .querySelector(`.notes__list-item[data-note-id="${note.id}"]`)
            .classList.add("notes__list-item--selected");
    }

    updateNotePreviewVisibility(visible) {
        this.root.querySelector(".notes__preview").style.visibility = visible
            ? "visible"
            : "visible";
    }
}
