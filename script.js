$(() => {
  $.getJSON('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', function (data) {
    $.each(data, function (key, value) {
      $('#currencySelect').append(`<option value="${value.ccy}">${value.ccy}</option>`);
    })
  })

  $('#currencyBtn').click(function (e) {
    e.preventDefault();
    let selectedCurrency = $('#currencySelect option:selected').text();
    $.ajax('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5', {
      url: 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5',
      data: $('#currencyBtn').serialize(),
      type: 'POST',
      success: function (data) {
        $.each(data, function (key, value) {
          if (selectedCurrency === value.ccy) {
            $('.currency-list').append(`<h1>${selectedCurrency}</h1><p>Курс покупки: ${this.buy} | Курс продажи: ${this.sale}</p>`)
          }
        })
      },
      fail: function () {
        $('.currency-list').append('<h1>Валюта не найдена</h1>')
      }
    })
  })

  $.getJSON('https://api.privatbank.ua/p24api/pboffice?json&city=', function (data) {
    $.each(data, function (key, value) {
      if (value.country === 'Украина') {
        $('#filialSelectCity').append(`<option value="${value.city}">${value.city}</option>`);
      }
    })
    $('#filialSelectCity').change(function () {
      $('#filialSelect option').remove();
      $.each(data, function (key, value) {
        if (value.city === $('#filialSelectCity option:selected').text()) {
          $('#filialSelect').append(`<option value="${value.address}">${value.address}</option>`);
        }
      })
    })
  })

  $('#filialBtn').click(function (e) {
    e.preventDefault();
    let selectedFilialCity = $('#filialSelectCity option:selected').text();
    let selectedFilial = $('#filialSelect option:selected').text();
    $.ajax(`https://api.privatbank.ua/p24api/pboffice?json&city=${selectedFilialCity}&address=${selectedFilial}`, {
      url: `https://api.privatbank.ua/p24api/pboffice?json&city=${selectedFilialCity}&address=${selectedFilial}`,
      data: $('#currencyBtn').serialize(),
      type: 'POST',
      success: function (data) {
        $.each(data, function (key, value) {
          $('.filial-list').append(`<h1>${this.name}</h1><p>Телефон: ${this.phone} | Email: ${this.email}</p>`)
        })
      },
      fail: function () {
        $('.filial-list').append('<h1>Отделение не найдено</h1>')
      }
    })
  })
})