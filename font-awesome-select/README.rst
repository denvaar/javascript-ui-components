Font Awesome Select
-------------------

A simple select field that can handle `Font Awesome <http://fontawesome.io/icons/>`_ icons as selection options. The size of the icons are customizable. There are two options for using this field.

1. Directly from an existing select element, where each option has a data attribute, ``data-meta``, which is the suffix of a Font Awesome icon class. For example, to use Font Awesome's paper airplane icon ``<i class="fa fa-paper-plane" aria-hidden="true"></i>``, the option tag should have ``data-meta="paper-plane"``.

2. As an array of javascript objects (see example below.) Note that this way still requires an select field as the target, but it may be empty.

Requires the Font Awesome library.

.. image:: fa-select.png


Example Usage (Existing select field)
=====================================

The select field must be wrapped inside another container element if you'd like to preserve the order of DOM elements on the page.

.. code-block:: html

  <div>
  <select id="my-select">
    <option>Select an option</option>
    <option data-meta="car" value="1">Drive</option>
    <option data-meta="bicycle" value="2">Ride</option>
    <option data-meta="plane" value="3">Fly</option>
  </select>
  </div>
.. code-block:: javascript

  var select = document.getElementById("my-select");
  var options = {
    "optionSize": "fa-2x",
    "selectionSize": "fa-1x"
  };

  var faSelect = new FontAwesomeSelect(select, options);
  

Example Usage (From JSON)
=========================

.. code-block:: html

  <div><select id="my-select"></select></div>
  
.. code-block:: javascript

  var options = {
    "optionSize": "fa-2x",
    "selectionSize": "fa-1x"
  };
  var data = [
    {
      "label": "Select an option",
    },
    {
      "label": "Drive",
      "meta": "car",
      "value": "1"
    },
    {
      "label": "Ride",
      "meta": "bicycle",
      "value": "2"
    },
    {
      "label": "Fly",
      "meta": "plane",
      "value": "3"
    },
  ];
  
  var opts = {
    "optionSize": "fa-lg",
    "selectionSize": "fa-lg"
  };
  
  var select = document.getElementById("my-select");
  var faSelect = new FontAwesomeSelect(select, opts, data);
  
Options
=======

.. code-block:: javascript

  var opts = {
    "optionSize": "fa-lg", // "fa-lg", "fa-2x", "fa-3x", "fa-4x", or "fa-5x"
    "selectionSize": "fa-lg" // "fa-lg", "fa-2x", "fa-3x", "fa-4x", or "fa-5x"
  };


``optionSize`` -- The size of the icons in the options list. "fa-lg" is the default.

``selectionSize``  -- the size of the selected icon. "fa-lg" is the default.
