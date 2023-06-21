import LoginPage from "../pages/LoginPage";
import LandingPage from "../pages/LandingPage";
import Helper from "../helpers/Helpers";

describe('template spec', () => {
  let username;
  let password;

  before(() => {
    username = Cypress.env('USERNAME');
    password = Cypress.env('PASSWORD');
  });

  it('Chart Test 1', () => {
    cy.visit('/')
    LoginPage.performLogin(username, password)
    cy.wait(5000)
    //Get chart first data
    LandingPage.getChartData().then((chartTestData) => {
      cy.wrap(chartTestData).as('chartTestData')
    });
    //Format to object
    cy.get('@chartTestData').then((chartData) => {
      cy.wrap(Helper.formatChartData(chartData)).as('chartTestData')
    });

    //Get table max page number
    LandingPage.tableIsVisible();
    LandingPage.clickLastTablePageBtn();
    LandingPage.getTableLastPageValue();
    LandingPage.clickFirstTablePageBtn();


    cy.get('@lastPage').then((lastPageValue) => {
      //Get table data
      let tableData = LandingPage.retrieveTableData(lastPageValue)
      //Replace the order
      LandingPage.changeTableData(lastPageValue, '10', 'Quant', '20')
      LandingPage.clickSaveTableBtn()
      //Replace data in the variable with table data before the change
      cy.wrap(tableData).then((data) => {
        const foundArray = data.findIndex((array) => array.some((value, index) => index === 1 && value === '10'));
        if (foundArray) {
          cy.log('Found:', foundArray);
          data[foundArray][3] = '20'
        } else {
          cy.log('Array not found');
        }
      });
      //Get new chart data
      LandingPage.getChartData().then((chartTestData) => {
        cy.wrap(chartTestData).as('newChartTestData')
      });
      //Format to object again
      cy.get('@newChartTestData').then((chartData) => {
        cy.wrap(Helper.formatChartData(chartData)).as('newChartTestData')
      });
      //Get table data again to compare
      let newTableData = LandingPage.retrieveTableData(lastPageValue)
      //Compare both table datas
      cy.wrap(tableData).then((arr1) => {
        cy.get('@newChartTestData').then((chartData) => {
          Helper.compareObjArrays(Helper.formatTableDataIntoChartData(arr1), chartData)
        });
        cy.wrap(newTableData).then((arr2) => {
          Helper.compareArrays(arr1, arr2);
        });
      });
    });
  })


  it('Chart Test 2', () => {
    cy.visit('/')
    LoginPage.performLogin(username, password)
    cy.wait(5000)
    //Get chart first data
    LandingPage.getChartData().then((chartTestData) => {
      cy.wrap(chartTestData).as('chartTestData')
    });
    //Format to object
    cy.get('@chartTestData').then((chartData) => {
      cy.wrap(Helper.formatChartData(chartData)).as('chartTestData')
    });

    //Get table max page number
    LandingPage.tableIsVisible();
    LandingPage.clickLastTablePageBtn();
    LandingPage.getTableLastPageValue();
    LandingPage.clickFirstTablePageBtn();


    cy.get('@lastPage').then((lastPageValue) => {
      //Get table data
      let tableData = LandingPage.retrieveTableData(lastPageValue)
      //Replace the order
      LandingPage.changeTableData(lastPageValue, '10', 'Quant', '20')
      LandingPage.clickSaveTableBtn()
      //Replace data in the variable with table data before the change
      cy.wrap(tableData).then((data) => {
        const foundArray = data.findIndex((array) => array.some((value, index) => index === 1 && value === '10'));
        if (foundArray) {
          cy.log('Found:', foundArray);
          data[foundArray][4] = 'Deli'
        } else {
          cy.log('Array not found');
        }
      });
      //Get new chart data
      LandingPage.getChartData().then((chartTestData) => {
        cy.wrap(chartTestData).as('newChartTestData')
      });
      //Format to object again
      cy.get('@newChartTestData').then((chartData) => {
        cy.wrap(Helper.formatChartData(chartData)).as('newChartTestData')
      });
      //Get table data again to compare
      let newTableData = LandingPage.retrieveTableData(lastPageValue)
      //Compare both table datas
      cy.wrap(tableData).then((arr1) => {
        cy.get('@newChartTestData').then((chartData) => {
          Helper.compareObjArrays(Helper.formatTableDataIntoChartData(arr1), chartData)
        });
        cy.wrap(newTableData).then((arr2) => {
          Helper.compareArrays(arr1, arr2);
        });
      });
    });
  })
})
