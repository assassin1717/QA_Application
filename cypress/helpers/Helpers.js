import _ from 'lodash';

class Helpers {
    formatTableDataIntoChartData(data) {
        const formattedData = {};

        data.forEach((arr) => {
            const series = arr[4];
            const group = arr[2];
            const value = parseInt(arr[3], 10) || 0;

            if (!formattedData[series]) {
                formattedData[series] = {
                    Series: series,
                    Apples: 0,
                    Bananas: 0,
                    Cantaloupe: 0,
                    Dates: 0,
                    Grapes: 0
                };
            }

            formattedData[series][group] += value;
        });

        return Object.values(formattedData);
    }

    formatChartData(originalData) {
        const formattedData = originalData.map((data) => {
            const formattedSeries = {};

            data.forEach((obj) => {
                const { Group, Value } = obj;
                const parsedValue = isNaN(Number(Value)) ? String(Value) : Number(Value);
                formattedSeries[Group] = parsedValue;
            });

            return {
                Series: data[0].Series,
                ...formattedSeries
            };
        });

        return formattedData;
    }

    compareObjArrays(arr1, arr2) {
        let differencesFound = false;
        for (let i = 0; i < arr1.length; i++) {
            const obj1 = arr1[i];
            const obj2 = arr2.find((item) => item.Series === obj1.Series);

            if (!obj2) {
                differencesFound = true;
            }

            if (!_.isEqual(obj1, obj2)) {
                differencesFound = true;
            }
        }

        if (!differencesFound)
            cy.log('Objects are equal');
        else
            cy.fail('Objects are not equal');
    }

    compareArrays(arr1, arr2) {
        let differencesFound = false;

        for (let i = 0; i < arr1.length; i++) {
            const subArray1 = arr1[i];
            const subArray2 = arr2[i];

            if (subArray1.length !== subArray2.length) {
                cy.log(`Subarrays at index ${i} have different lengths`);
                differencesFound = true;
                continue;
            }

            for (let j = 0; j < subArray1.length; j++) {
                if (subArray1[j] !== subArray2[j]) {
                    cy.log(`Values at index ${i},${j} are different: ${subArray1[j]} !== ${subArray2[j]}`);
                    differencesFound = true;
                }
            }
        }

        if (!differencesFound)
            cy.log('Arrays are equal');
        else
            cy.fail('Arrays are not equal');
    }
}

export default new Helpers();