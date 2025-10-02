// Select hone par toolbar icons change karne ka logic
const selectAllCheckbox = document.getElementById("select-all");
const emailCheckboxes = document.querySelectorAll('.email-row .email-checkbox');
const toolbarDefaultIcons = document.querySelector(".toolbar-default-icon");
const toolbarSelectIcons = document.querySelector(".toolbar-select-hidden-icon");
const emailCountElement = document.querySelector('.nav-list .count');

// Function to update toolbar visibility and email count
function updateToolbarAndCount() {
    const selectedEmails = document.querySelectorAll('.email-row.selected').length;
    if (selectedEmails > 0) {
        toolbarDefaultIcons.classList.add('hidden');
        toolbarSelectIcons.classList.remove('hidden');
    } else {
        toolbarDefaultIcons.classList.remove('hidden');
        toolbarSelectIcons.classList.add('hidden');
    }
}

// Select All checkbox ka event listener
selectAllCheckbox.addEventListener('change', () => {
    const isChecked = selectAllCheckbox.checked;
    emailCheckboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
        const emailRow = checkbox.closest('.email-row');
        if (isChecked) {
            emailRow.classList.add('selected');
        } else {
            emailRow.classList.remove('selected');
        }
    });
    updateToolbarAndCount();
});

// Refresh button ka logic
const refreshButton = document.querySelector('.refresh-btn');
refreshButton.addEventListener('click', () => {
    location.reload(); 
    console.log("Emails refreshed!");
});

// Individual email checkboxes ka event listener
emailCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        const emailRow = checkbox.closest('.email-row');
        emailRow.classList.toggle('selected');
        updateToolbarAndCount();
    });
});

// Delete button ka logic
const deleteButton = document.querySelector('.delete');
deleteButton.addEventListener('click', () => {
    const selectedEmails = document.querySelectorAll('.email-row.selected');
    let currentCount = parseInt(emailCountElement.textContent, 10);
    
    selectedEmails.forEach(email => {
        email.remove();
        currentCount--;
    });
    emailCountElement.textContent = currentCount;
    updateToolbarAndCount(); 
});

// More/Less button ka logic
const moreButton = document.querySelector('.more-less-btn');
const hiddenOptions = document.querySelector('.hidden-options');
moreButton.addEventListener('click', () => {
    hiddenOptions.classList.toggle('visible');
    const icon = moreButton.querySelector('img');

    if (hiddenOptions.classList.contains('visible')) {
        icon.src = 'uparrow.svg';
        icon.alt = 'up arrow';
        moreButton.querySelector('span').textContent = 'less';
    } else {
        icon.src = 'downarrow.svg';
        icon.alt = 'down arrow';
        moreButton.querySelector('span').textContent = 'more';
    }
});

// Archive button ka logic
const archiveButton = document.querySelector('.archive-btn');
archiveButton.addEventListener('click', () => {
    const selectedEmails = document.querySelectorAll('.email-row.selected');
    let currentCount = parseInt(emailCountElement.textContent, 10);

    selectedEmails.forEach(email => {
        email.remove();
        currentCount--;
    });
    emailCountElement.textContent = currentCount;
    updateToolbarAndCount();
});

// Star / Unstar logic
const starIcons = document.querySelectorAll('.left-side img[alt="starred"], .left-side img[alt="unstarred"]');

starIcons.forEach(star => {
    star.addEventListener('click', (event) => {
        event.stopPropagation();
        if (star.src.includes('starred.png')) {
            star.src = 'unstarred.png';
            star.alt = 'unstarred';
        } else {
            star.src = 'starred.png';
            star.alt = 'starred';
        }
    });
});

// Mark as Read / Unread (row action buttons + toolbar button)
const markUnreadBtn = document.querySelector('.markunread');
markUnreadBtn.addEventListener('click', () => {
    const selectedEmails = document.querySelectorAll('.email-row.selected');
    selectedEmails.forEach(email => {
        email.classList.toggle('unread');
    });
});

const markReadIcons = document.querySelectorAll('.action img[alt="mark-as-read"]');
markReadIcons.forEach(icon => {
    icon.addEventListener('click', (event) => {
        event.stopPropagation();
        const emailRow = icon.closest('.email-row');
        emailRow.classList.toggle('unread');
    });
});

// Report Spam button logic
const reportSpamBtn = document.querySelector('.report-spam');
reportSpamBtn.addEventListener('click', () => {
    const selectedEmails = document.querySelectorAll('.email-row.selected');
    let currentCount = parseInt(emailCountElement.textContent, 10);

    selectedEmails.forEach(email => {
        email.remove();
        currentCount--;
    });
    emailCountElement.textContent = currentCount;
    updateToolbarAndCount();
});

// Search bar filtering logic
const searchInput = document.querySelector('.search-bar input[type="search"]');
const allEmailRows = document.querySelectorAll('.email-row');

searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    allEmailRows.forEach(row => {
        const sender = row.querySelector('.sender-name').textContent.toLowerCase();
        const subject = row.querySelector('.subject').textContent.toLowerCase();
        const preview = row.querySelector('.preview-text').textContent.toLowerCase();
        
        if (sender.includes(query) || subject.includes(query) || preview.includes(query)) {
            row.style.display = 'flex';
        } else {
            row.style.display = 'none';
        }
    });
});

// Tabs switching logic
const tabs = document.querySelectorAll('.main-toolbar-list li');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const category = tab.getAttribute('data-category');
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        allEmailRows.forEach(row => {
            if (row.getAttribute('data-category') === category) {
                row.style.display = 'flex';
            } else {
                row.style.display = 'none';
            }
        });
    });
});

// Compose button and modal logic
const composeBtn = document.querySelector('.compose-button');
const composeModal = document.createElement('div');
composeModal.classList.add('compose-modal', 'hidden');

composeModal.innerHTML = `
    <div class="compose-box">
        <h3>New Message</h3>
        <input type="text" placeholder="Recipients" class="compose-to">
        <input type="text" placeholder="Subject" class="compose-subject">
        <textarea placeholder="Write your message here..." class="compose-body"></textarea>
        <div class="compose-actions">
            <button class="send-btn">Send</button>
            <button class="close-btn">Close</button>
        </div>
    </div>
`;
document.body.appendChild(composeModal);

const closeBtn = composeModal.querySelector('.close-btn');
const sendBtn = composeModal.querySelector('.send-btn');
const emailList = document.querySelector('.email-list');

composeBtn.addEventListener('click', () => {
    composeModal.classList.remove('hidden');
});

closeBtn.addEventListener('click', () => {
    composeModal.classList.add('hidden');
});



sendBtn.addEventListener('click', () => {
    const to = composeModal.querySelector('.compose-to').value;
    const subject = composeModal.querySelector('.compose-subject').value;
    const body = composeModal.querySelector('.compose-body').value;

    if (to && subject) {
        const newEmail = document.createElement('div');
        newEmail.classList.add('email-row', 'unread');
        newEmail.setAttribute('data-category', 'primary');
        newEmail.innerHTML = `
            <div class="left-side">
                <div><input type="checkbox" class="email-checkbox" /></div>
                <div><img src="unstarred.png" alt="unstarred" /></div>
                <div class="sender-name">${to}</div>
            </div>
            <div class="middle-side">
                <div class="subject">${subject}</div>
                <div class="preview-text">${body.substring(0, 40)}...</div>
            </div>
            <div class="right-side">
                <div class="date">Now</div>
            </div>
            <div class="action">
                <img src="archive.png" alt="archive" />
                <img src="delete.png" alt="delete" />
                <img src="mark-as-read.png" alt="mark-as-read" />
                <img src="snooze.png" alt="snooze" />
            </div>
        `; // <-- yahan pe closing backtick hona chahiye

        emailList.prepend(newEmail);
        let currentCount = parseInt(emailCountElement.textContent, 10);
        currentCount++;
        emailCountElement.textContent = currentCount;

        composeModal.classList.add('hidden');
        alert("Email sent successfully!");
    } else {
        alert("Please fill in all fields.");
    }
});

const hamburgerBtn = document.querySelector('.hamburger img');
const sidebar = document.querySelector('.left-panel');
const rightContentArea = document.querySelector('.right-content-area');

if (hamburgerBtn && sidebar && rightContentArea) {
    hamburgerBtn.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
    });
}