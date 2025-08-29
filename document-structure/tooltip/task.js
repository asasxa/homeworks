document.addEventListener('DOMContentLoaded', function () {
  const body = document.body;
  let activeTooltipElement = null;

  const tooltip = document.createElement('div');
  tooltip.className = 'tooltip';
  body.appendChild(tooltip);

  document.addEventListener('click', function (event) {
    const target = event.target;

    if (target.classList.contains('has-tooltip')) {
      event.preventDefault();
      event.stopPropagation();

      const text = target.getAttribute('title');
      const position = target.getAttribute('data-position') || 'top';

      if (tooltip.classList.contains('tooltip_active') && activeTooltipElement === target) {
        tooltip.classList.remove('tooltip_active');
        activeTooltipElement = null;
        return;
      }

      tooltip.textContent = text;
      tooltip.classList.add('tooltip_active');
      activeTooltipElement = target;

      const rect = target.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();

      let left, top;

      switch (position) {
        case 'top':
          left = rect.left + (rect.width - tooltipRect.width) / 2;
          top = rect.top - tooltipRect.height - 5;
          break;
        case 'bottom':
          left = rect.left + (rect.width - tooltipRect.width) / 2;
          top = rect.bottom + 5;
          break;
        case 'left':
          left = rect.left - tooltipRect.width - 5;
          top = rect.top + (rect.height - tooltipRect.height) / 2;
          break;
        case 'right':
          left = rect.right + 5;
          top = rect.top + (rect.height - tooltipRect.height) / 2;
          break;
        default:
          left = rect.left + (rect.width - tooltipRect.width) / 2;
          top = rect.top - tooltipRect.height - 5;
      }

      tooltip.style.left = `${left}px`;
      tooltip.style.top = `${top}px`;
    }
  });

  document.addEventListener('click', function (event) {
    if (tooltip.classList.contains('tooltip_active') && !event.target.classList.contains('has-tooltip') && !tooltip.contains(event.target)) {
      tooltip.classList.remove('tooltip_active');
      activeTooltipElement = null;
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && tooltip.classList.contains('tooltip_active')) {
      tooltip.classList.remove('tooltip_active');
      activeTooltipElement = null;
    }
  });
});
