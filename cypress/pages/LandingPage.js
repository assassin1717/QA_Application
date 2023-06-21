class LandingPage {
    getChartData() {
        const chartData = [];

        for (let i = 2; i <= 5; i++) {
            cy.get('#R12602632517025750547_jet')
                .find(`svg:nth-child(2) > g > g > g:nth-child(1) > g:nth-child(2) > g:nth-child(2) > g:nth-child(${i})`)
                .then((svgElement) => {
                    const dotsData = [];

                    cy.get(svgElement)
                        .find(i === 2 ? 'path' : i > 3 ? 'polygon' : 'circle')
                        .each(($dot) => {
                            cy.wrap($dot).click({ force: true });
                            cy.get($dot).then(($element) => {
                                const ariaLabel = $element.attr('aria-label');
                                dotsData.push(ariaLabel);
                            });
                        })
                        .then(() => {
                            chartData.push(dotsData);
                        });
                });
        }

        return new Cypress.Promise((resolve) => {
            cy.wrap(chartData).then(() => {
                resolve(this.formatChartObj(chartData));
            });
        });
    }

    formatChartObj(chartData) {
        let formattedData = []
        cy.wrap(chartData).each((chartDataArray) => {
            let dataArray = []
            cy.wrap(chartDataArray).each((inputString) => {
                const removeUnwanted = inputString.split('. ');
                const keyValuePairs = removeUnwanted[0].split(';');

                const result = {};

                keyValuePairs.forEach((pair) => {
                    // Split the pair into key and value
                    const [key, value] = pair.split(':');

                    const trimmedKey = key.trim();
                    const trimmedValue = value.trim();

                    result[trimmedKey] = trimmedValue;
                });
                dataArray.push(result);
            });
            formattedData.push(dataArray);
        });
        return formattedData;
    }

    getTableLastPageValue() {
        cy.get('#R12602633341339750555_ig_grid_vc > div.a-GV-footer.js-stickyWidget-toggle > div.a-GV-pagination > span.a-GV-pageSelector > ul > li:nth-child(4) > button')
            .invoke('text')
            .then((text) => {
                cy.wrap(text).as('lastPage')
            });
    }

    clickTableNextPageBtn() {
        cy.get('#R12602633341339750555_ig_grid_vc > div.a-GV-footer.js-stickyWidget-toggle > div.a-GV-pagination > button.a-GV-pageButton.a-GV-pageButton--nav.a-Button.js-pg-next')
            .click();
    }

    clickFirstTablePageBtn() {
        cy.get('#R12602633341339750555_ig_grid_vc > div.a-GV-footer.js-stickyWidget-toggle > div.a-GV-pagination > button.a-GV-pageButton.a-GV-pageButton--nav.a-Button.js-pg-first')
            .click();
    }

    clickLastTablePageBtn() {
        cy.get('#R12602633341339750555_ig_grid_vc > div.a-GV-footer.js-stickyWidget-toggle > div.a-GV-pagination > button.js-pg-last')
            .click();
    }

    clickSaveTableBtn() {
        cy.get('button#B12602635547059750577')
            .click()
    }

    tableIsVisible() {
        cy.get('table').should('be.visible');
    }

    retrieveTableData(lastPageValue) {
        const table = [];

        for (let i = 1; i <= Number(lastPageValue); i++) {
            cy.get('table')
                .find('tbody tr')
                .each(($tr) => {
                    const values = [];
                    cy.wrap($tr).within(() => {
                        cy.get('td').each(($td) => {
                            cy.wrap($td)
                                .invoke('text')
                                .then((text) => {
                                    values.push(text);
                                });
                        });
                        table.push(values);
                    });
                });

            if (i < Number(lastPageValue))
                this.clickTableNextPageBtn();

        }
        this.clickFirstTablePageBtn()

        table.sort((a, b) => {
            const valueA = parseInt(a[1]);
            const valueB = parseInt(b[1]);

            return valueA - valueB;
        });

        return table;
    }

    clickCustomerModalSearchBtn() {
        cy.get('#PopupLov_1_C12602635031717750572_dlg > div.a-PopupLOV-searchBar > button')
            .click()
    }

    clickCustomerModalFirstOption() {
        cy.get('#PopupLov_1_C12602635031717750572_dlg > div.a-PopupLOV-results.a-TMV > div > div.a-TMV-w-scroll > ul > li')
            .click()
    }

    changeTableData(lastPageValue, order, field, value) {
        let stopLoops = false;

        for (let i = 1; i <= Number(lastPageValue); i++) {
            cy.get('table')
                .find('tbody tr')
                .each(($tr) => {
                    cy.wrap($tr)
                        .find('td:nth-child(3)')
                        .invoke('text')
                        .then((text) => {
                            if (text === order) {
                                if (field === 'Quant')
                                    cy.wrap($tr)
                                        .find('td:nth-child(5)')
                                        .dblclick()
                                        .type(value)
                                        .type('{esc}');
                                else {
                                    cy.wrap($tr)
                                        .find('td:nth-child(6)')
                                        .dblclick()
                                        .type(value)
                                    this.clickCustomerModalSearchBtn()
                                    this.clickCustomerModalFirstOption()
                                }

                                stopLoops = true;
                                return false;
                            }
                        });

                    if (stopLoops) {
                        return false;
                    }
                });

            if (stopLoops) {
                break;
            }

            if (i < Number(lastPageValue)) {
                this.clickTableNextPageBtn();
            }
        }
        this.clickFirstTablePageBtn()
    }
}

export default new LandingPage();