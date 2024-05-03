export const columns =  [
    { Header: 'ID', accessor: 'id', disableSortBy: true },
    { Header: 'Meal Name', accessor: 'mealName' },
    { Header: 'Ingredients', accessor: 'ingredients', Cell: row => row.value.join(', ') },
    { Header: 'Calories', accessor: 'calories', disableSortBy: true }
]

export const tracking_options = [
    { label: "Exchange Lists", value: "exchange" },
    { label: "Brands", value: "brand" },
];

export const food_groups = [
    {label: "Starch/Bread", value: "starch"},
    {label: "Lean Meat", value: "meat_lean"},
    {label: "Medium Fat Meat", value: "meat_mfat"},
    {label: "High Fat Meat", value: "meat_hfat"},
    {label: "Vegetable", value: "vegetable"},
    {label: "Fruit", value: "fruit"},
    {label: "Skim Milk", value: "milk_skim"},
    {label: "Low Fat Milk", value: "milk_lfat"},
    {label: "Whole Milk", value: "milk_whole"},
    {label: "Fat", value: "fat"},

]

export const starches = [
    {label: "Cereals/Grains/Pasta", value: "cereals_grain_pasta_ss"},
    {label: "Dried Beans/Peas/Lentils", value: "dried_beans_peas_lentils_ss"},
    {label: "Starchy Vegetables", value: "starchy_vegetables_ss"},
    {label: "Bread", value: "bread_ss"},
    {label: "Crackers/Snacks", value: "crackers_snacks_ss"},
    {label: "Starchy Foods Prepared with Fat", value: "starchy_foods_prepared_with_fat_ss"}
];

export const starch_items = {
    cereals_grain_pasta_ss: [
        { label: "Bran cereals (concentrated)", value: "bran_cereals_conc" },
        { label: "Bran cereals (flaked)", value: "bran_cereals_flaked" },
        { label: "Bulgur (cooked)", value: "bulgur_cooked" },
        { label: "Cooked cereals", value: "cooked_cereals" },
        { label: "Cornmeal (dry)", value: "cornmeal_dry" },
        { label: "Grape Nuts", value: "grape_nuts" },
        { label: "Grits (cooked)", value: "grits_cooked" },
        { label: "Pasta (cooked)", value: "pasta_cooked" },
        { label: "Puffed cereal", value: "puffed_cereal" },
        { label: "Rice, white or brown (cooked)", value: "rice_cooked" },
        { label: "Shredded wheat", value: "shredded_wheat" },
        { label: "Wheat germ", value: "wheat_germ" }
    ],
    dried_beans_peas_lentils_ss: [
        { label: "Beans and peas (cooked)", value: "beans_and_peas_cooked" },
        { label: "Lentils (cooked)", value: "lentils_cooked" },
        { label: "Baked beans", value: "baked_beans" }
    ],
    starchy_vegetables_ss: [
        { label: "Corn", value: "corn" },
        { label: "Corn on the cob", value: "corn_on_the_cob" },
        { label: "Lima beans", value: "lima_beans" },
        { label: "Green Peas (canned or frozen)", value: "green_peas" },
        { label: "Plantain", value: "plantain" },
        { label: "Potato (baked)", value: "baked_potato" },
        { label: "Potato (mashed)", value: "mashed_potato" },
        { label: "Squash (acorn or butternut)", value: "winter_squash" },
        { label: "Yam (sweet potato)", value: "sweet_potato" }
    ],
    bread_ss: [
        { label: "Bagel", value: "bagel" },
        { label: "Bread sticks (crisp)", value: "crisp_bread_sticks" },
        { label: "Croutons low fat", value: "low_fat_croutons" },
        { label: "English muffin", value: "english_muffin" },
        { label: "Frankfurter or hamburger bun", value: "bun" },
        { label: "Pita", value: "pita" },
        { label: "Plain roll (small)", value: "plain_roll" },
        { label: "Raisin (unfrosted)", value: "raisin_bread" },
        { label: "Rye (pumpernickel)", value: "rye_bread" },
        { label: "White Wheat or Whole wheat", value: "whole_wheat_bread" }
    ],
    crackers_snacks_ss: [
        { label: "Animal crackers", value: "animal_crackers" },
        { label: "Graham crackers", value: "graham_crackers" },
        { label: "Matzoh", value: "matzoh" },
        { label: "Melba toast", value: "melba_toast" },
        { label: "Oyster crackers", value: "oyster_crackers" },
        { label: "Popcorn", value: "popcorn" },
        { label: "Pretzels", value: "pretzels" },
        { label: "Rye crisp", value: "rye_crisp" },
        { label: "Saltine-type crackers", value: "saltine_crackers" },
        { label: "Whole-wheat crackers, no fat added", value: "whole_wheat_crackers" },
        { label: "Whole-wheat crackers, fat added", value: "whole_wheat_crackers_fat" }
    ],
    starchy_foods_prepared_with_fat_ss: [
        { label: "Biscuit", value: "biscuit" },
        { label: "Chow mein noodles", value: "chow_mein_noodles" },
        { label: "Corn bread", value: "corn_bread" },
        { label: "Cracker, round butter type", value: "butter_cracker" },
        { label: "French-fried potatoes", value: "french_fried_potatoes" },
        { label: "Muffin", value: "muffin" },
        { label: "Pancake", value: "pancake" },
        { label: "Stuffing, bread (prepared)", value: "bread_stuffing" },
        { label: "Taco shell", value: "taco_shell" },
        { label: "Waffle", value: "waffle" }
    ]
};