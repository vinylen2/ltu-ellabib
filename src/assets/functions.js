const custom = {
  appendIcon(elementId, avatarIcon, avatarColor) {
      var main = document.getElementById(elementId);
      const icon = document.createElement('i');
      icon.className = `v-icon mdi mdi-${avatarIcon} ${avatarColor}--text`;
      icon.id = `icon-${elementId}`;
      main.appendChild(icon);
  },
  removeElement(elementId) {
    var element = document.getElementById(elementId);
    element.remove();
  },
};

module.exports = custom;
