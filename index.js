'use strict'

const url = "https://developer.nps.gov/api/v1/parks?"
const api = "sR5HKTDhcCuMpFI0TOCuakykfMJvzWEV10oL0agb";

function createRenderString(obj) {
    let parkArray = [];
    console.log(obj);
    parkArray = obj.data.map(park => {
        return `<li><h1>${park.name}</h1><p>${park.addresses[1].line1}<br>${(park.addresses[1].line2) ? park.addresses[1].line2 + "<br>" : ""}${park.addresses[1].city + " " + park.addresses[1].stateCode + ", " + park.addresses[1].postalCode}</p><p>${park.description}</p><a href="${park.url}">Link</a></li>`
    });
    return parkArray;
}

function renderResults(str) {
    $('#results-list').html(str);
}

function createRequestString(arr) {
    let arrString = '';
    let frmt = arr.split(',');
    arrString = frmt.map((state) => {
        return `stateCode=${state}&`
    });

    arrString = arrString.join('');
    return arrString;
}

function init() {
    // $("#states").load("states.html");
    $('form').on('submit', function (e) {

        e.preventDefault();
        $('#results-list').html('');
        $('.loading').toggleClass('hidden');
        fetch(`${url}${createRequestString($('#states').val())}limit=${$('#max').val()}&api_key=${api}`, {
            headers: {
                'accept': 'application/json',
            }

        })
            .then(response => response.json())
            .then(data => {
                if (data.total === "0") {
                    throw 'No data found.';
                }
                else {
                    return createRenderString(data)
                }
            })
            .then(str => {
                $('.loading').toggleClass('hidden');
                renderResults(str);
            })
            .catch((error) => {
                alert('Error getting parks.');
                $('.loading').toggleClass('hidden');
            });
    })
}

$(init)