
class CustomSelect {
  
  constructor(select, options) {
    this.select = select;
    this.isActive = false;
    // get the selected value, or default to the first <option>
    var defaultOption = this.select.querySelector('option[selected]');
    this.defaultOption = defaultOption || this.select.querySelector("option");
    this.selectedIndex = this.select.selectedIndex;
    if (!defaultOption) this.selectedIndex += 1;
    // build out the HTML structure
    this.makeStructure();
    // Define the options (list items with the data-option attrib)
    this.options = [].slice.call(
      this.customSelect.querySelectorAll("li[data-option]"));
    this.selectedOption = this.customSelect.querySelector("span.placeholder");
    // setup event listeners.
    this.createEvents();
  }

  // TODO could be re-factored out of class
  hasParent(e, p) {
    if (!e) return false;
    var el = e.target||e.srcElement||e||false;
    while (el && el != p) {
      el = el.parentNode||false;
    }
    return (el!==false);
  }

  makeStructure() {
    var options = "";
    var renderListItem = (el) => {
      
      var value = el.value;
      var metaLabel = "";
      var label = el.textContent;

      // Grab the meta options.
      for (var key in el.dataset) {
        if (el.dataset.hasOwnProperty(key)) {
          metaLabel = el.dataset[key]; // TODO allow for multiple.
        }
      }

      return `<li data-option data-value=${value}>
            ${metaLabel}
            <span data-label>${label}</span>
            </li>`;
    };
    [].slice.call(this.select.children).forEach((el) => {
      var tag = el.tagName.toLowerCase();

      if (tag === "option" && el.hasAttribute("value")) {
        options += renderListItem(el);
      }
    });

    var dropdown = `<div class="custom-options"><ul>${options}</ul></div>`;
    this.customSelect = document.createElement("div");
    this.customSelect.tabIndex = this.select.tabIndex;
    this.customSelect.className = "custom-select";
    this.customSelect.innerHTML = `<span class="placeholder">
      ${this.defaultOption.textContent}</span>` + dropdown;
    this.select.parentNode.appendChild(this.customSelect);
    this.customSelect.appendChild(this.select); // Finished HTML structure

  }

  createEvents() {
    var self = this;

    this.selectedOption.addEventListener("click", () => {
      self.toggleSelected();
    });

    this.options.forEach((option, index) => {
      option.addEventListener("click", () => {
        self.selectedIndex = index;
        self.toggleSelected();
        self.changeSelection();
      });
    });

    
    document.addEventListener("click", (event) => {
      if (self.isActive && event.target !== self.customSelect &&
          !self.hasParent(event.target, self.customSelect)) {
        
        self.toggleSelected();
      }
    });


    // keyboard navigation events
    this.customSelect.addEventListener("keydown", (event) => {
      var keyCode = event.keyCode || event.which;
      
      switch (keyCode) {
        // up key
        case 38:
          event.preventDefault();
          if (self.selectedIndex <= 0) {
            self.selectedIndex = self.options.length - 1;
          } else {
            self.selectedIndex--;
          }

          var oldOption = self.customSelect.querySelector('li.active-item');
          if (oldOption) oldOption.classList.remove('active-item');
          self.options[self.selectedIndex].classList.add('active-item');
          
          console.log("move to previous!");//self._navigateOpts('prev');
          
          break;
        // down key
        case 40:
          event.preventDefault();
          if (self.selectedIndex >= self.options.length - 1) {
            self.selectedIndex = 0;
          } else {
            self.selectedIndex++;
          }
          
          var oldOption = self.customSelect.querySelector('li.active-item');
          if (oldOption) oldOption.classList.remove('active-item');
          self.options[self.selectedIndex].classList.add('active-item');
          
          console.log("move to next!");//self._navigateOpts('next');
          break;
        // enter key
        case 13:
          event.preventDefault();
          if(self.isActive &&
             typeof(self.preSelCurrent) != 'undefined' &&
             self.preSelCurrent !== -1 ) {
            
            self._changeOption();
            self.toggleSelected();
          }
          break;
      }
    });

  }

  changeSelection() {
    var option = this.options[this.selectedIndex];
    this.selectedOption.innerHTML = option.innerHTML;
    var meta = this.selectedOption.querySelector("[data-meta]")
    if (meta) {
      meta.classList.remove("fa-2x");
      meta.style.width = "25px";
    }
    this.select.value = option.dataset.value;
  }

  toggleSelected() {
    this.customSelect.querySelector("div.custom-options").classList.toggle(
      "active-menu");
    this.selectedOption.classList.toggle("placeholder-active");
    this.isActive = !this.isActive;  
    
    var oldOption = this.customSelect.querySelector('li.active-item');
    if (oldOption) oldOption.classList.remove('active-item');
    this.options[this.selectedIndex].classList.add('active-item');
  }

}
