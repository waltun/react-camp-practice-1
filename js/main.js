//Variables
const price = document.getElementById('priceInput');
const day = document.getElementById('dayInput');
const month = document.getElementById('monthInput');
const year = document.getElementById('yearInput');
const description = document.getElementById('descriptionInput');
const form = document.getElementById('form');
const showDataTable = document.getElementById('showDataTable');
const incomeSection = document.getElementById('incomeSection');
const expenseSection = document.getElementById('expenseSection');

//Waiting for submit form
form.addEventListener('submit', e => {
    e.preventDefault();
    validateData();
});

//Show errors
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
}

//Empty errors section
const emptyError = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
}

//Validation form
const validateData = () => {
    const priceValue = price.value;
    const dayValue = day.value;
    const monthValue = month.value;
    const yearValue = year.value;
    const descriptionValue = description.value;
    const type = document.querySelector('input[name="income"]:checked');
    const errors = [];

    if (priceValue === '') {
        object = {
            "element": price,
            "message": 'لطفا مبلغ را وارد کنید'
        }

        errors.push(object);

    }

    if (isNaN(priceValue)) {
        object = {
            "element": price,
            "message": 'لطفا فقط عدد وارد کنید'
        }

        errors.push(object);

    }

    if (dayValue === '') {
        object = {
            "element": day,
            "message": 'لطفا روز را وارد کنید'
        }

        errors.push(object);

    }

    if (isNaN(dayValue)) {
        object = {
            "element": day,
            "message": 'لطفا فقط عدد وارد کنید'
        }

        errors.push(object);

    }

    if (dayValue.length > 2) {
        object = {
            "element": day,
            "message": 'لطفا روز را با فرمت درست وارد کنید (25)'
        }

        errors.push(object);

    }

    if (monthValue === '') {
        object = {
            "element": month,
            "message": 'لطفا ماه را وارد کنید'
        }

        errors.push(object);

    }

    if (isNaN(monthValue)) {
        object = {
            "element": month,
            "message": 'لطفا فقط عدد وارد کنید'
        }

        errors.push(object);

    }

    if (monthValue.length > 2) {
        object = {
            "element": month,
            "message": 'لطفا ماه را با فرمت درست وارد کنید (04)'
        }

        errors.push(object);

    }

    if (yearValue === '') {
        object = {
            "element": year,
            "message": 'لطفا سال را وارد کنید'
        }

        errors.push(object);

    }

    if (isNaN(yearValue)) {
        object = {
            "element": year,
            "message": 'لطفا فقط عدد وارد کنید'
        }

        errors.push(object);

    }

    if (yearValue.length > 4) {
        object = {
            "element": year,
            "message": 'لطفا سال را با فرمت درست وارد کنید (1401)'
        }

        errors.push(object);

    }

    if (descriptionValue === '') {
        object = {
            "element": description,
            "message": 'لطفا توضیحات را وارد کنید'
        }

        errors.push(object);

    }

    if (errors.length > 0) {

        errors.forEach(item => {
            setError(item.element, item.message)
        });

    } else {

        const elements = [
            price, day, month, year, description
        ]

        for (let index = 0; index < elements.length; index++) {
            emptyError(elements[index]);
        }

        //Save data after validate data
        saveData(priceValue, dayValue, monthValue, yearValue, descriptionValue, type);

    }
}

//Store data in localStorage
const saveData = (priceValue, dayValue, monthValue, yearValue, descriptionValue, type) => {

    const newData = {
        id: Math.floor(Math.random() * 10000) + 1,
        price: priceValue,
        day: dayValue,
        month: monthValue,
        year: yearValue,
        description: descriptionValue,
        type: type.value
    };

    if (localStorage.getItem('data') == null) {
        localStorage.setItem('data', '[]');
    }

    const oldData = JSON.parse(localStorage.getItem('data'));
    oldData.push(newData);

    localStorage.setItem('data', JSON.stringify(oldData));

    //Get new items and show
    const newItems = JSON.parse(localStorage.getItem('data'));
    showItems(newItems);

    //Clear input values
    const elements = [price, day, month, year, description];
    clearValues(elements);

    //Show Success message - SweetAlert
    Swal.fire({
        title: 'موفق',
        text: 'آیتم مورد نظر با موفقیت اضافه شد',
        icon: 'success',
        confirmButtonText: 'خب',
        timer: 1500
    });

}

//Clear input values after store data
const clearValues = (elements) => {
    elements.forEach(element => {
        element.value = ''
    });
}

//Show items when page reload
window.addEventListener('load', e => {

    const items = JSON.parse(localStorage.getItem('data'));

    if (items != null) {
        //Show items
        showItems(items);
    }

});

//Show all items in table
const showItems = (items) => {

    //Empty items section before show
    showDataTable.innerHTML = '';

    //Calculate income
    calculateIncome(items);

    //Calculate expense
    calculateExpense(items);

    runChart();

    items.forEach((item, index) => {

        showDataTable.innerHTML += `
            <tr class="hover:bg-gray-100">
                <td class="px-4 py-2 whitespace-nowrap text-center text-green-600">
                    <p class="text-sm">
                        ${index + 1}
                    </p>
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-center">
                    <p class="text-gray-900 text-xs text-center">
                        ${parseInt(item.price).toLocaleString()} تومان
                    </p>
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-center">
                    <p class="text-gray-900 text-xs text-center">
                        ${item.year}/${item.month}
                    </p>
                </td>
                <td class="px-4 py-2 whitespace-nowrap text-center">
                    ${item.type == 'expense' ? '<p class="text-white text-xs text-center bg-yellow-500 py-2 rounded-md px-4">هزینه</p>' : '<p class="text-white text-xs text-center bg-green-500 py-2 rounded-md px-4">درآمد</p>'}
                </td>
                <td class="px-4 py-2 whitespace-nowrap flex items-center justify-center">
                    <div x-data="{open:false}">
                        <button @click="open = !open"
                            class="text-xs px-4 py-2 rounded-md bg-indigo-500 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            توضیحات
                        </button>
                        <!-- Description Modal -->
                        <div class="fixed z-10 inset-0 overflow-y-auto" x-show="open"
                            x-transition aria-labelledby="modal-title" role="dialog"
                            aria-modal="true">
                            <div
                                class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                                    aria-hidden="true"></div>
                                <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
                                    aria-hidden="true">&#8203;</span>
                                <div
                                    class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div class="sm:flex sm:items-start">
                                            <div
                                                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    class="h-6 w-6" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor"
                                                    stroke-width="2">
                                                    <path stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                                </svg>
                                            </div>
                                            <div
                                                class="mt-3 text-center sm:mt-0 sm:mr-4 sm:text-right">
                                                <h3 class="text-lg leading-6 font-medium text-gray-500"
                                                    id="modal-title">توضیحات</h3>
                                                <div class="mt-2">
                                                    <p class="text-sm text-gray-900">
                                                        ${item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button type="button" @click="open=false"
                                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                                            بستن
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mr-2" x-data="{open:false}">
                        <button @click="open = !open"
                            class="text-xs px-4 py-2 rounded-md bg-red-500 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            حذف
                        </button>

                        <!-- Delete Modal -->
                        <div class="fixed z-10 inset-0 overflow-y-auto" x-show="open"
                            x-transition aria-labelledby="modal-title" role="dialog"
                            aria-modal="true">
                            <div
                                class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                                    aria-hidden="true"></div>
                                <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
                                    aria-hidden="true">&#8203;</span>
                                <div
                                    class="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div class="sm:flex sm:items-start">
                                            <div
                                                class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                    class="h-6 w-6" fill="none"
                                                    viewBox="0 0 24 24" stroke="currentColor"
                                                    stroke-width="2">
                                                    <path stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </div>
                                            <div
                                                class="mt-3 text-center sm:mt-0 sm:mr-4 sm:text-right">
                                                <h3 class="text-lg leading-6 font-medium text-gray-500"
                                                    id="modal-title">حذف</h3>
                                                <div class="mt-2">
                                                    <p class="text-sm text-gray-900">
                                                        آیا از حذف کردن مطمئن هستید
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button type="button" onclick="deleteItem(${item.id})"
                                            class="w-full inline-flex justify-center rounded-md shadow-sm border border-gray-200 px-4 py-2 bg-white text-base font-medium text-black hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm">
                                            بله
                                        </button>
                                        <button type="button" @click="open=false"
                                            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">
                                            خیر
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        `
    });
}

//Delete specific item from localStorage
const deleteItem = (id) => {

    if (localStorage.getItem('data') != null) {

        const items = JSON.parse(localStorage.getItem('data'));

        items.forEach((item, index) => {

            if (item.id == id) {
                items.splice(index, 1)
            }

        });

        //Set new items in localStorage
        localStorage.setItem('data', JSON.stringify(items));

        //Get new items and show
        const newItems = JSON.parse(localStorage.getItem('data'));
        showItems(newItems);

        //Show Success message - SweetAlert
        Swal.fire({
            title: 'موفق',
            text: 'آیتم مورد نظر با موفقیت حذف شد',
            icon: 'success',
            confirmButtonText: 'خب',
            timer: 1500
        });

    }
}

//Calculate sum of incomes
const calculateIncome = (items) => {

    let incomeSum = 0;

    for (let index = 0; index < items.length; index++) {
        if (items[index].type == 'income') {
            incomeSum += parseInt(items[index].price);
        }
    }

    incomeSection.innerHTML = incomeSum.toLocaleString() + ' ' + 'تومان';

}

//Calculate sum of expenses
const calculateExpense = (items) => {

    let expenseSum = 0;

    for (let index = 0; index < items.length; index++) {
        if (items[index].type == 'expense') {
            expenseSum += parseInt(items[index].price);
        }
    }

    expenseSection.innerHTML = expenseSum.toLocaleString() + ' ' + 'تومان';

}