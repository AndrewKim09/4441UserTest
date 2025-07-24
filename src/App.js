import React, { useState, useEffect } from 'react';

const App = () => {
  const [currentTask, setCurrentTask] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [results, setResults] = useState([]);
  const [showInstructions, setShowInstructions] = useState(true);
  const [currentMenuPlacement, setCurrentMenuPlacement] = useState();
  const [targetPath, setTargetPath] = useState(null);
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const [selectedSection, setSelectedSection] = useState(null);
  const [itemList, setItemList] = useState([]);
  const [shuffledTasks, setShuffledTasks] = useState([]);

  const [menuPlacements, setMenuPlacements] = useState(['top', 'left', 'right']);
  const [taskType, setTaskType] = useState(null);
  const [showAlert, setShowAlert] = useState(true);
  

  const [testFinished, setTestFinished] = useState(false);

  const [topPlacementErrors, setTopPlacementErrors] = useState(0);
  const [leftPlacementErrors, setLeftPlacementErrors] = useState(0);
  const [rightPlacementErrors, setRightPlacementErrors] = useState(0);
  const [topPlacementCompletionTime, setTopPlacementCompletionTime] = useState(0);
  const [leftPlacementCompletionTime, setLeftPlacementCompletionTime] = useState(0);
  const [rightPlacementCompletionTime, setRightPlacementCompletionTime] = useState(0);

    console.log("top placement errors: ", topPlacementErrors, " left placement errors: ", leftPlacementErrors, " right placement errors: ", rightPlacementErrors);
    console.log("top placement completion time: ", topPlacementCompletionTime, " left placement completion time: ", leftPlacementCompletionTime, " right placement completion time: ", rightPlacementCompletionTime);

  // Hierarchical menu structure
  const menuItems = {
  'Clothing': {
    'Men': {
      'Tops': {
        'T-Shirts': 'clothing/men/tops/tshirts',
        'Shirts': 'clothing/men/tops/shirts',
        'Hoodies': 'clothing/men/tops/hoodies',
        'Tank Tops': 'clothing/men/tops/tank-tops',
        'Jackets': 'clothing/men/tops/jackets'
      },
      'Bottoms': {
        'Jeans': 'clothing/men/bottoms/jeans',
        'Chinos': 'clothing/men/bottoms/chinos',
        'Shorts': 'clothing/men/bottoms/shorts'
      }
    },
    'Women': {
      'Tops': {
        'Blouses': 'clothing/women/tops/blouses',
        'Crop Tops': 'clothing/women/tops/crop-tops',
        'Cardigans': 'clothing/women/tops/cardigans'
      },
      'Bottoms': {
        'Skirts': 'clothing/women/bottoms/skirts',
        'Leggings': 'clothing/women/bottoms/leggings',
        'Capris': 'clothing/women/bottoms/capris',
        'Shorts': 'clothing/women/bottoms/shorts'
      }
    },
    'Kids': {
      'Tops': {
        'T-Shirts': 'clothing/kids/tops/t-shirts',
        'Hoodies': 'clothing/kids/tops/hoodies'
      },
      'Bottoms': {
        'Joggers': 'clothing/kids/bottoms/joggers'
      }
    }
  },
  'Accessories': {
    'Men': {
      'Functional': {
        'Wallets': 'accessories/men/functional/wallets',
        'Belts': 'accessories/men/functional/belts'
      },
      'Fashion': {
        'Sunglasses': 'accessories/men/fashion/sunglasses',
        'Hats': 'accessories/men/fashion/hats',
        'Watches': 'accessories/men/fashion/watches'
      }
    },
    'Women': {
      'Jewelry': {
        'Necklaces': 'accessories/women/jewelry/necklaces',
        'Bracelets': 'accessories/women/jewelry/bracelets',
        'Earrings': 'accessories/women/jewelry/earrings'
      },
      'Bags': {
        'Handbags': 'accessories/women/bags/handbags',
        'Crossbody': 'accessories/women/bags/crossbody',
        'Clutches': 'accessories/women/bags/clutches',
        'Totes': 'accessories/women/bags/totes'
      }
    }
  },
  'Footwear': {
    'Men': {
      'Casual': {
        'Sneakers': 'footwear/men/casual/sneakers',
        'Loafers': 'footwear/men/casual/loafers',
        'Slip-Ons': 'footwear/men/casual/slip-ons'
      },
      'Formal': {
        'Dress Shoes': 'footwear/men/formal/dress-shoes',
        'Oxfords': 'footwear/men/formal/oxfords'
      }
    },
    'Women': {
      'Casual': {
        'Sandals': 'footwear/women/casual/sandals',
        'Flats': 'footwear/women/casual/flats',
        'Slip-Ons': 'footwear/women/casual/slip-ons'
      },
      'Formal': {
        'Heels': 'footwear/women/formal/heels',
        'Wedges': 'footwear/women/formal/wedges'
      },
      'Dress': {
        'Heels': 'footwear/women/dress/heels' // For backward compatibility
      }
    }
  },
  'Beauty': {
    'Makeup': {
      'Face': {
        'Foundation': 'beauty/makeup/face/foundation',
        'Blush': 'beauty/makeup/face/blush',
        'Highlighter': 'beauty/makeup/face/highlighter'
      },
      'Eyes': {
        'Mascara': 'beauty/makeup/eyes/mascara',
        'Eyeshadow': 'beauty/makeup/eyes/eyeshadow',
        'Eyeliners': 'beauty/makeup/eyes/eyeliners'
      }
    },
    'Skincare': {
      'Cleansers': {
        'Foam': 'beauty/skincare/cleansers/foam',
        'Gel': 'beauty/skincare/cleansers/gel',
        'Oil-Based': 'beauty/skincare/cleansers/oil-based'
      },
      'Moisturizers': {
        'Cream': 'beauty/skincare/moisturizers/cream',
        'Lotion': 'beauty/skincare/moisturizers/lotion',
        'Gel-Based': 'beauty/skincare/moisturizers/gel-based',
        'Night Creams': 'beauty/skincare/moisturizers/night-creams',
        'SPF': 'beauty/skincare/moisturizers/spf'
      }
    }
  },
  'Home & Living': {
    'Kitchen': {
      'Cookware': {
        'Pans': 'home/kitchen/cookware/pans',
        'Pots': 'home/kitchen/cookware/pots',
        'Baking Dishes': 'home/kitchen/cookware/baking-dishes'
      },
      'Appliances': {
        'Blenders': 'home/kitchen/appliances/blenders',
        'Toasters': 'home/kitchen/appliances/toasters',
        'Microwaves': 'home/kitchen/appliances/microwaves'
      }
    },
    'Decor': {
      'Lighting': {
        'Lamps': 'home/decor/lighting/lamps',
        'String Lights': 'home/decor/lighting/string-lights'
      },
      'Wall Art': {
        'Prints': 'home/decor/wall-art/prints',
        'Mirrors': 'home/decor/wall-art/mirrors'
      }
    },
    'Furniture': {
      'Living Room': {
        'Coffee Tables': 'home/furniture/living-room/coffee-tables'
      }
    }
  },
  'Sports': {
    'Indoor': {
      'Fitness': {
        'Yoga Mats': 'sports/indoor/fitness/yoga-mats',
        'Dumbbells': 'sports/indoor/fitness/dumbbells',
        'Resistance Bands': 'sports/indoor/fitness/resistance-bands'
      }
    },
    'Outdoor': {
      'Running': {
        'Running Shoes': 'sports/outdoor/running/running-shoes',
        'Arm Bands': 'sports/outdoor/running/arm-bands'
      },
      'Camping': {
        'Tents': 'sports/outdoor/camping/tents',
        'Sleeping Bags': 'sports/outdoor/camping/sleeping-bags',
        'Camp Stoves': 'sports/outdoor/camping/camp-stoves'
      }
    },
    'Fitness': {
      'Equipment': {
        'Dumbbells': 'sports/fitness/equipment/dumbbells'
      }
    }
  },
  'Books': {
    'Fiction': {
      'Genres': {
        'Fantasy': 'books/fiction/genres/fantasy',
        'Thriller': 'books/fiction/genres/thriller',
        'General': 'books/fiction/genres/general'
      }
    },
    'Non-Fiction': {
      'Topics': {
        'Self-Help': 'books/non-fiction/topics/self-help',
        'Health': 'books/non-fiction/topics/health',
        'History': 'books/non-fiction/topics/history'
      }
    }
  },
  'Groceries': {
    'Produce': {
      'Fresh': {
        'Spinach': 'groceries/produce/fresh/spinach',
        'Almonds': 'groceries/produce/fresh/almonds',
        'Lettuce': 'groceries/produce/fresh/lettuce'
      }
    },
    'Fruits & Vegetables': {
      'Fresh': {
        'Apples': 'groceries/fruits-vegetables/fresh/apples'
      }
    },
    'Dairy': {
      'Milk': {
        'Almond Milk': 'groceries/dairy/milk/almond-milk',
        'Regular Milk': 'groceries/dairy/milk/regular'
      },
      'Cheese': {
        'Cheddar': 'groceries/dairy/cheese/cheddar',
        'Mozzarella': 'groceries/dairy/cheese/mozzarella'
      }
    }
  },
  'Electronics': {
    'Phones': {
      'Smartphones': {
        'Apple': 'electronics/phones/smartphones/apple',
        'Samsung': 'electronics/phones/smartphones/samsung'
      }
    },
    'Computers': {
      'Accessories': {
        'Mice': 'electronics/computers/accessories/mice'
      },
      'Laptops': {
        'Gaming': 'electronics/computers/laptops/gaming'
      }
    }
  },
  'Toys': {
    'By Type': {
      'Action': {
        'Superheroes': 'toys/by-type/action/superheroes'
      }
    }
  }
};



const findingTaskInfo = {
  "Find men's sneakers": { path: "Footwear→Men→Casual→Sneakers", item: "Sneakers" },
  "Find men's jeans": { path: "Clothing→Men→Bottoms→Jeans", item: "Jeans" },
  "Find men's wallets": { path: "Accessories→Men→Functional→Wallets", item: "Wallets" },
  "Find men's hoodies": { path: "Clothing→Men→Tops→Hoodies", item: "Hoodies" },
  "Find men's sunglasses": { path: "Accessories→Men→Fashion→Sunglasses", item: "Sunglasses" },
  "Find men's watches": { path: "Accessories→Men→Fashion→Watches", item: "Watches" },
  "Find women's heels": { path: "Footwear→Women→Dress→Heels", item: "Heels" },
  "Find women's crop tops": { path: "Clothing→Women→Tops→Crop Tops", item: "Crop Tops" },
  "Find women's necklaces": { path: "Accessories→Women→Jewelry→Necklaces", item: "Necklaces" },
  "Find women's handbags": { path: "Accessories→Women→Bags→Handbags", item: "Handbags" },
  "Find women's leggings": { path: "Clothing→Women→Bottoms→Leggings", item: "Leggings" },
  "Find kids' t-shirts": { path: "Clothing→Kids→Tops→T-Shirts", item: "T-Shirts" },
  "Find kids' joggers": { path: "Clothing→Kids→Bottoms→Joggers", item: "Joggers" },
  "Find kids' hoodies": { path: "Clothing→Kids→Tops→Hoodies", item: "Hoodies" },
  "Find Apple smartphones": { path: "Electronics→Phones→Smartphones→Apple", item: "Apple" },
  "Find Samsung smartphones": { path: "Electronics→Phones→Smartphones→Samsung", item: "Samsung" },
  "Find laptop mice": { path: "Electronics→Computers→Accessories→Mice", item: "Mice" },
  "Find gaming laptops": { path: "Electronics→Computers→Laptops→Gaming", item: "Gaming" },
  "Find mascara": { path: "Beauty→Makeup→Eyes→Mascara", item: "Mascara" },
  "Find night creams": { path: "Beauty→Skincare→Moisturizers→Night Creams", item: "Night Creams" },
  "Find SPF moisturizers": { path: "Beauty→Skincare→Moisturizers→SPF", item: "SPF" },
  "Find coffee tables": { path: "Home & Living→Furniture→Living Room→Coffee Tables", item: "Coffee Tables" },
  "Find dumbbells": { path: "Sports→Fitness→Equipment→Dumbbells", item: "Dumbbells" },
  "Find tents": { path: "Sports→Outdoor→Camping→Tents", item: "Tents" },
  "Find superhero toys": { path: "Toys→By Type→Action→Superheroes", item: "Superheroes" },
  "Find fantasy books": { path: "Books→Fiction→Genres→Fantasy", item: "Fantasy" },
  "Find self-help books": { path: "Books→Non-Fiction→Topics→Self-Help", item: "Self-Help" },
  "Find almond milk": { path: "Groceries→Dairy & Eggs→Milk→Almond Milk", item: "Almond Milk" },
  "Find fresh apples": { path: "Groceries→Fruits & Vegetables→Fresh→Apples", item: "Apples" },
};




  const windowShoppingTasks = [
  "Find a gift for a family member.",
  "Look for something useful for a parent.",
  "Browse items for a young child.",
  "Pick out a present for someone special.",
  "Shop for something to wear.",
  "Find something for an upcoming event.",
  "Explore options for entertainment.",
  "Look for items to upgrade your home.",
  "Find something for your daily routine.",
  "Get something to wear for the season.",
  "Pick a gift for someone with a specific hobby.",
  "Search for something educational.",
  "Look for items to refresh your look.",
  "Find something comfortable for cooler weather.",
  "Find something for school or work.",
  "Shop for something that fits your style.",
  "Get something practical for everyday use.",
  "Find something that suits the season.",
  "Pick up things you need for a healthy lifestyle.",
  "Look for something versatile and functional.",
  "Find something enjoyable to give to a friend.",
  "Explore products for self-care."
];


const findingTasks = [
  "Find men's sneakers",
  "Find men's jeans",
  "Find men's wallets",
  "Find men's hoodies",
  "Find men's sunglasses",
  "Find men's watches",
  "Find women's heels",
  "Find women's crop tops",
  "Find women's necklaces",
  "Find women's handbags",
  "Find women's leggings",
  "Find kids' t-shirts",
  "Find kids' joggers",
  "Find kids' hoodies",
  "Find Apple smartphones",
  "Find Samsung smartphones",
  "Find laptop mice",
  "Find gaming laptops",
  "Find mascara",
  "Find blush",
  "Find night creams",
  "Find SPF moisturizers",
  "Find coffee tables",
  "Find dumbbells",
  "Find tents",
  "Find superhero toys",
  "Find fantasy books",
  "Find self-help books",
  "Find almond milk",
  "Find fresh apples"
];

  function getRandomItems(arr, count) {
    const shuffled = [...arr];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, count);
  }

  function StartNewMenuPlacementTest() {
    if(menuPlacements.length === 0) setTestFinished(true);
    let newMenuPlacementTest = menuPlacements[Math.floor(Math.random() * menuPlacements.length)]
    setCurrentTask(0);

    setCurrentMenuPlacement(newMenuPlacementTest);
    setMenuPlacements(prev => prev.filter(mp => mp !== newMenuPlacementTest));

    let shuffled = getShuffledSelectionsFromMultipleArrays();
    setShuffledTasks(shuffled);
    console.log("first task", shuffled[0]);
    if(shuffled[0].source === "finding") {
      setTaskType("finding");
      console.log("task path", findingTaskInfo[shuffled[0].task].path);
      setTargetPath(findingTaskInfo[shuffled[0].task].path);
    }
    else {
      setTaskType("windowShopping");
    }

    console.log("New menu placement test started:", shuffled);
    setShowAlert(true);
    
  }

  function getShuffledSelectionsFromMultipleArrays() {
    let result = [];

    const arraysWithLabels = [
      { source: "finding", data: findingTasks },
      { source: "windowShopping", data: windowShoppingTasks }
    ];

    for (const { source, data } of arraysWithLabels) {
      // Get 1 random entry from the array
      const randomTasks = getRandomItems(data, 3);

      for (const task of randomTasks) {
        result.push({
          task: task,
          source: source,
        });
      }
    }

    // Shuffle the final combined result
    return result.sort(() => 0.5 - Math.random());
  }


  const startTask = () => {
    setStartTime(Date.now());
    setShowAlert(false);
  };

  const handleMenuClick = (clickedPath) => {
    let currentLevel;

    for (const key of clickedPath) {
      currentLevel = currentLevel ? currentLevel[key] : menuItems[key];
    }

    console.log('Clicked path:', clickedPath);
    console.log('Current level:', currentLevel, " length", (Object.keys(currentLevel).length));

    setItemList(currentLevel);
  };

  useEffect(() => {
    if (showInstructions) return;

    StartNewMenuPlacementTest();

  }, [showInstructions]);

  const HandleItemClick = (item) => {
    if(showAlert || showInstructions || testFinished) return;
    console.log("targetPath ", targetPath, "item ", item);
    console.log("clicked item:", item);
    if(taskType === "windowShopping") {
      const completionTime = Date.now() - startTime;

      setItemList([]);
      setOpenMenus({});

      if(currentMenuPlacement === 'top') {
        setTopPlacementErrors(prev => prev - 1);
        setTopPlacementCompletionTime(prev => prev + completionTime);
      }
      else if(currentMenuPlacement === 'left') {
        setLeftPlacementErrors(prev => prev - 1);
        setLeftPlacementCompletionTime(prev => prev + completionTime);
      }
      else if(currentMenuPlacement === 'right') {
        setRightPlacementErrors(prev => prev - 1);
        setRightPlacementCompletionTime(prev => prev + completionTime);
      }

      setTaskCompleted(true);
      setResults(prev => [...prev, {menuPlacement: currentMenuPlacement, task: currentTask + 1, completionTime }]);
      
      setTimeout(() => {

        console.log("open menus", openMenus);
        setTaskCompleted(false);
        if(currentTask >= shuffledTasks.length - 1) {
          StartNewMenuPlacementTest();
        }
        else
        {
          let currentTaskNumber = currentTask + 1;
          setCurrentTask(currentTaskNumber);
          if(shuffledTasks[currentTaskNumber].source === "finding") {
            setTaskType("finding");
            setTargetPath(findingTaskInfo[shuffledTasks[currentTaskNumber].task].path);
          }
          else {
            setTaskType("windowShopping");
          }

          setSelectedSection(null);
          setItemList([]);

          setShowAlert(true);
        }

      }, 5000)
      return
    }
    const pathArray = targetPath.split('→').map(s => s.trim());
    const targetItem = pathArray[pathArray.length - 1]; // "T-Shirts"
    console.log("targetItem", targetItem);
    if (item === targetItem) {
      const completionTime = Date.now() - startTime;
      
      setItemList([]);
      setOpenMenus({});
      
      setResults(prev => [...prev, {menuPlacement: currentMenuPlacement, task: currentTask + 1, completionTime }]);
      setTaskCompleted(true);

      if(currentMenuPlacement === 'top') {
        setTopPlacementErrors(prev => prev - 1);
        setTopPlacementCompletionTime(prev => prev + completionTime);
      }
      else if(currentMenuPlacement === 'left') {
        setLeftPlacementErrors(prev => prev - 1);
        setLeftPlacementCompletionTime(prev => prev + completionTime);
      }
      else if(currentMenuPlacement === 'right') {
        setRightPlacementErrors(prev => prev - 1);
        setRightPlacementCompletionTime(prev => prev + completionTime); 
      }
      
      setTimeout(() => {
        setTaskCompleted(false);
        if(currentTask >= shuffledTasks.length - 1) {
          StartNewMenuPlacementTest();
        }
        else{
          let currentTaskNumber = currentTask + 1;
          setCurrentTask(currentTaskNumber);
          if(shuffledTasks[currentTaskNumber].source === "finding") {
            setTaskType("finding");
            setTargetPath(findingTaskInfo[shuffledTasks[currentTaskNumber].task].path);
          }
          else {
            setTaskType("windowShopping");
          }

          setSelectedSection(null);
          setItemList([]);

          setShowAlert(true);
        }

      }, 5000)
    }
  }

  const toggleMenu = (menuPath) => {
    if(showAlert || showInstructions || testFinished) return;
    const pathString = menuPath.join('→');
    console.log("menuPath", menuPath, "pathString", pathString);

    if(taskType === "windowShopping") {
      if(currentMenuPlacement === 'top') {
        setTopPlacementErrors(prev => prev - 1);
      }
      else if(currentMenuPlacement === 'left') {
        setLeftPlacementErrors(prev => prev - 1);
      }
      else if(currentMenuPlacement === 'right') {
        setRightPlacementErrors(prev => prev - 1);
      }
    }
    else if(!showAlert && !testFinished && !showInstructions) {
      if(targetPath.includes(menuPath))
      {
        if(currentMenuPlacement === 'top') {
          setTopPlacementErrors(prev => prev - 1);
        }
        else if(currentMenuPlacement === 'left') {
          setLeftPlacementErrors(prev => prev - 1);
        }
        else if(currentMenuPlacement === 'right') {
          setRightPlacementErrors(prev => prev - 1);
        }
      }
    }

    setOpenMenus(prev => {
      const newOpenMenus = {};

      // Keep open all ancestors of the clicked path
      for (let i = 1; i <= menuPath.length; i++) {
        const ancestorPath = menuPath.slice(0, i).join('→');
        newOpenMenus[ancestorPath] = true;
      }

      // If the clicked path is already open, collapse it (and its children)
      if (prev[pathString]) {
        return {}; // close everything
      }

      return newOpenMenus;
    });
  };


  const renderMenuItems = (items, currentPath = [], depth = 0) => {
    return Object.keys(items).map(key => {
      const newPath = [...currentPath, key];
      const pathString = newPath.join('→');
      const isOpen = openMenus[pathString];
      const value = items[key];
      
      // Check if this is the deepest level (contains URLs)
      const isLeafLevel = typeof value === 'string';
      
      // Check if this is the 2nd deepest level (contains objects with URLs)
      const is2ndDeepest = !isLeafLevel && Object.values(value).every(v => typeof v === 'string');
      
      if (isLeafLevel) {
        // This is a leaf item (deepest level) - don't render individually
        return null;
      }
      
      if (is2ndDeepest) {
        // This is 2nd deepest level - clicking here should show all sub-items
        return (
          <div key={pathString} className="relative">
            <button
              onClick={() => handleMenuClick(newPath)}
              className={`block w-full text-left px-4 py-2 hover:bg-gray-700 rounded transition-colors ${
                selectedSection && selectedSection.join('→') === pathString ? 'bg-blue-600' : ''
              }`}
              style={{ marginLeft: `${depth * 20}px` }}
            >
              {key}
              {selectedSection && selectedSection.join('→') === pathString && (
                <span className="ml-2 text-green-400">✓</span>
              )}
            </button>
            
            {/* Show all sub-items when this section is selected */}
            {selectedSection && selectedSection.join('→') === pathString && (
              <div className="p-3 mt-2 ml-4 bg-gray-700 rounded">
                <div className="mb-2 text-sm text-gray-300">Items in {key}:</div>
                {Object.keys(value).map(subItem => (
                  <div key={subItem} className="px-2 py-1 mb-1 text-sm text-white bg-gray-600 rounded">
                    {subItem}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      }
      
      // This is a category or subcategory level
      return (
        <div key={pathString} className="relative">
          <button
            onClick={() => toggleMenu(newPath)}
            className="flex items-center justify-between w-full px-4 py-2 text-left transition-colors rounded hover:bg-gray-700"
            style={{ marginLeft: `${depth * 20}px` }}
          >
            <span>{key}</span>
            <span className={`transform transition-transform ${isOpen ? 'rotate-90' : ''}`}>
              ▶
            </span>
          </button>
          
          {isOpen && (
            <div className="mt-1">
              {renderMenuItems(value, newPath, depth + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  const renderMenu = () => {
    const baseClasses = "bg-gray-800 text-white";
    
    switch (currentMenuPlacement) {
      case 'top':
        return (
          <nav className={`${baseClasses} w-full p-4`}>
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-wrap justify-center space-x-8">
                {Object.keys(menuItems).map(category => {
                  const isOpen = openMenus[category];
                  return (
                    <div key={category} className="relative">
                      <button
                        onClick={() => toggleMenu([category])}
                        className="flex items-center px-4 py-2 space-x-2 transition-colors rounded hover:bg-gray-700"
                      >
                        <span>{category}</span>
                        <span className={`transform transition-transform ${isOpen ? 'rotate-90' : ''}`}>
                          ▶
                        </span>
                      </button>
                      
                      {isOpen && (
                        <div className="absolute left-0 z-50 mt-2 bg-gray-800 border border-gray-600 rounded shadow-lg top-full min-w-64">
                          <div className="p-2">
                            {renderMenuItems(menuItems[category], [category], 1)}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </nav>
        );
      
      case 'left':
        return (
          <nav className={`${baseClasses} w-80 min-h-screen p-4 overflow-y-auto`}>
            <div className="space-y-2">
              {renderMenuItems(menuItems)}
            </div>
          </nav>
        );
      
      case 'right':
        return (
          <nav className={`${baseClasses} w-80 min-h-screen p-4 overflow-y-auto`}>
            <div className="space-y-2">
              {renderMenuItems(menuItems)}
            </div>
          </nav>
        );
      
      default:
        return null;
    }
  };

  const renderTaskPrompt = () => {
    console.log("shuffledTasks", shuffledTasks);
    const taskText = shuffledTasks[currentTask]?.task;
    console.log("Current task:", currentTask, "Task text:", taskText);

    if(showAlert)
      return(
        <div className="p-6 text-center bg-blue-100 rounded-lg">
        <h3 className="mb-2 text-xl font-bold">Task {currentTask + 1} of {shuffledTasks.length}</h3>
        <p className="text-lg">{taskText}</p>
        <p className="mt-2 text-sm text-gray-600">Menu placement: {currentMenuPlacement}</p>
        <p className="mt-1 text-xs text-gray-500">Click on "{targetPath ? targetPath.split('→').slice(-2, -1)[0] : ''}" to see all items in that section</p>

        <button onClick={() => startTask()} className="px-4 py-2 mt-4 text-white bg-blue-500 rounded">
          Start Task
        </button>
      </div>
      );

    return (
      <div className="bg-blue-100 p-6 rounded-lg text-center w-[600px] mx-auto">
        <h3 className="mb-2 text-xl font-bold">Task {currentTask + 1} of {shuffledTasks.length}</h3>
        <p className="text-lg">{taskText}</p>
        <p className="mt-2 text-sm text-gray-600">Menu placement: {currentMenuPlacement}</p>
        <p className="mt-1 text-xs text-gray-500">Click on "{targetPath ? targetPath.section : ''}" to see all items in that section</p>
        {taskCompleted && (
          <div className="p-3 mt-4 text-green-800 bg-green-100 rounded">
            ✅ Task completed! All items in the section are now displayed. Moving to next task...
          </div>
        )}
      </div>
    );
  };

  const IncrementErrors = () => {
    if(showAlert || showInstructions || testFinished) return;

    if(currentMenuPlacement === 'top') {
      setTopPlacementErrors(prev => prev + 1);
    }
    else if(currentMenuPlacement === 'left') {
      setLeftPlacementErrors(prev => prev + 1);
    }
    else if(currentMenuPlacement === 'right') {
      setRightPlacementErrors(prev => prev + 1);
    }
  }

  if (showInstructions) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
        <div className="w-full max-w-2xl p-8 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Navigation Task Experiment</h2>
          <div className="space-y-4 text-gray-700">
            <p>Welcome to the navigation experiment! You will be asked to complete a series of navigation tasks.</p>
            
            <div className="p-4 rounded bg-yellow-50">
              <h3 className="mb-2 font-bold">Instructions:</h3>
              <ul className="space-y-1 list-disc list-inside">
                <li>You will see different menu layouts (top, left, or right placement)</li>
                <li>For each task, find and click the specified menu item as quickly and accurately as possible</li>
                <li>The timer starts when you make your first click</li>
                <li>Try to minimize errors - incorrect clicks will be tracked</li>
                <li>There are 24 total tasks to complete</li>
              </ul>
            </div>
            
            <p className="text-sm text-gray-600">
              This experiment measures the effectiveness of different menu placements on navigation performance.
              Your task completion time, error rate, and ease of use will be recorded.
            </p>
          </div>
          
          <button
            onClick={() => setShowInstructions(false)}
            className="px-6 py-2 mt-6 text-white bg-green-600 rounded hover:bg-green-700"
          >
            Start Experiment
          </button>
        </div>
      </div>
    );
  }

  if(testFinished) {
    return (
        <div className="p-8 text-center">
          <h2 className="mb-4 text-2xl font-bold">Experiment Complete!</h2>
          <p className="mb-4">Thank you for participating in the navigation experiment.</p>
          <div className="p-4 bg-gray-100 rounded">
            <h3 className="mb-2 font-bold">Results Summary:</h3>
            <p>Total tasks completed: {results.length}</p>
            <p>Top Placement Errors: {topPlacementErrors}</p>
            <p>Left Placement Errors: {leftPlacementErrors}</p>
            <p>Right Placement Errors: {rightPlacementErrors}</p>
            <p>Top Placement Average Completion Time: {(topPlacementCompletionTime / 1000).toFixed(2)} seconds</p>
            <p>Left Placement Average Completion Time: {(leftPlacementCompletionTime / 1000).toFixed(2)} seconds</p>
            <p>Right Placement Average Completion Time: {(rightPlacementCompletionTime / 1000).toFixed(2)} seconds</p>
          </div>
        </div>
    );
  }
  
  return (
    <div className="relative min-h-screen bg-gray-50" onClick={() => IncrementErrors()}>
      {/* Task prompt */}
      <div className="absolute bottom-0 w-full p-4">
        {renderTaskPrompt()}
      </div>

      {/* Main layout based on menu placement */}
      <div className={`flex ${currentMenuPlacement === 'top' ? 'flex-col' : 'flex-row'} min-h-screen`}>
        {currentMenuPlacement === 'top' && renderMenu()}
        {currentMenuPlacement === 'left' && renderMenu()}
        
        {/* Main content area */}
        <div className="flex-1 p-8 bg-white">
          {itemList && Object.keys(itemList).length > 0 && (
            Object.entries(itemList).map(([itemName, itemValue], index) => (
              <button
                key={itemName}
                className="p-4 mb-2 bg-gray-100 rounded shadow"
                onClick={() => HandleItemClick(itemName)}
              >
                <h3 className="text-lg font-semibold">{itemName}</h3>
              </button>
            ))
          )}
        </div>

        
        {currentMenuPlacement === 'right' && renderMenu()}
      </div>
    </div>
  );
};

export default App;