(function() {
  const containerSelector = 'div.flex.h-full.flex-col.overflow-y-auto';

  function addHitbox() {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    if (container._hitboxAdded) return;

    const hitbox = document.createElement('div');
    hitbox.style.position = 'absolute';
    hitbox.style.top = '0';
    hitbox.style.right = '0';
    hitbox.style.width = '20px';
    hitbox.style.height = '100%';
    hitbox.style.cursor = 'grab';
    hitbox.style.zIndex = '9999';
    hitbox.style.background = 'transparent';
    hitbox.style.pointerEvents = 'auto';
    hitbox.style.userSelect = 'none';

    // Reenviar eventos para que funcionen normalmente
    ['mousedown', 'mousemove', 'mouseup', 'wheel', 'click'].forEach(evtName => {
      hitbox.addEventListener(evtName, e => {
        const evt = new e.constructor(e.type, e);
        container.dispatchEvent(evt);
        e.preventDefault();
        e.stopPropagation();
      });
    });

    // Asegura posicionamiento relativo para el contenedor
    const style = getComputedStyle(container);
    if (style.position === 'static') {
      container.style.position = 'relative';
    }

    container.appendChild(hitbox);
    container._hitboxAdded = true;
  }

  // Intenta agregar hitbox cada 500ms (en caso que la página recargue dinámicamente)
  const interval = setInterval(() => {
    addHitbox();
  }, 500);
})();
