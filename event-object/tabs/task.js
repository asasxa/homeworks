document.addEventListener('DOMContentLoaded', function () {
  const tabContainers = document.querySelectorAll('.tabs');

  tabContainers.forEach(container => {
    const tabNavigation = container.querySelector('.tab__navigation');
    const tabs = container.querySelectorAll('.tab');
    const contents = container.querySelectorAll('.tab__content');

    tabNavigation.addEventListener('click', function (event) {
      const clickedTab = event.target;

      if (!clickedTab.classList.contains('tab')) return;

      const index = Array.from(tabs).indexOf(clickedTab);

      tabs.forEach(tab => tab.classList.remove('tab_active'));
      contents.forEach(content => content.classList.remove('tab__content_active'));

      tabs[index].classList.add('tab_active');
      contents[index].classList.add('tab__content_active');
    });
  });
});