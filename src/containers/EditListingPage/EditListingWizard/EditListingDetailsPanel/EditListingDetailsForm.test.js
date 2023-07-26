import React from 'react';
import '@testing-library/jest-dom';

import { fakeIntl } from '../../../../util/testData';
import { renderWithProviders as render, testingLibrary } from '../../../../util/testHelpers';

import EditListingDetailsForm from './EditListingDetailsForm';

const { screen, userEvent, act } = testingLibrary;

const noop = () => null;

beforeEach(() => {
  jest.clearAllMocks()
})

describe('EditListingDetailsForm', () => {
  it('Check that shipping fees can be given and submit button activates', () => {
    const saveActionMsg = 'Save details';

    const selectableListingTypes = [
      {
        listingType: 'sell-bicycles',
        transactionProcessAlias: 'default-purchase/release-1',
        unitType: 'item',
      },
    ];

    const listingFieldsConfig = [
      {
        key: 'category',
        scope: 'public',
        includeForListingTypes: ['sell-bicycles'],
        schemaType: 'enum',
        enumOptions: [
          { option: 'men', label: 'Men' },
          { option: 'women', label: 'Women' },
          { option: 'kids', label: 'Kids' },
        ],
        filterConfig: {
          indexForSearch: true,
          label: 'Amenities',
        },
        showConfig: {
          label: 'Category',
          isDetail: true,
        },
        saveConfig: {
          label: 'Category',
        },
      },
      {
        key: 'amenities',
        scope: 'public',
        includeForListingTypes: [
          'rent-bicycles-daily',
          'rent-bicycles-nightly',
          'rent-bicycles-hourly',
        ],
        schemaType: 'multi-enum',
        enumOptions: [
          { option: 'towels', label: 'Towels' },
          { option: 'bathroom', label: 'Bathroom' },
          { option: 'swimming_pool', label: 'Swimming pool' },
          { option: 'barbeque', label: 'Barbeque' },
        ],
        filterConfig: {
          indexForSearch: true,
          label: 'Amenities',
        },
        showConfig: {
          label: 'Category',
        },
        saveConfig: {
          label: 'Amenities',
        },
      },
    ];

    render(
      <EditListingDetailsForm
        intl={fakeIntl}
        dispatch={noop}
        onSubmit={v => v}
        saveActionMsg={saveActionMsg}
        updated={false}
        updateInProgress={false}
        disabled={false}
        ready={false}
        listingFieldsConfig={listingFieldsConfig}
        selectableListingTypes={selectableListingTypes}
        hasExistingListingType={true}
        initialValues={selectableListingTypes[0]}
      />,
    );

    // Pickup fields
    const title = 'EditListingDetailsForm.title';
    expect(screen.getByText(title)).toBeInTheDocument();

    const description = 'EditListingDetailsForm.description';
    expect(screen.getByText(description)).toBeInTheDocument();

    const dimensions = 'EditListingDetailsForm.dimensions';
    expect(screen.getByText(dimensions)).toBeInTheDocument();

    // Test that save button is disabled at first
    expect(screen.getByRole('button', { name: saveActionMsg })).toBeDisabled();

    // Fill mandatory attributes
    userEvent.type(screen.getByRole('textbox', { name: title }), 'My Listing');
    userEvent.type(screen.getByRole('textbox', { name: description }), 'Lorem ipsum');
    userEvent.type(screen.getByRole('textbox', { name: dimensions }), 'Lorem ipsum');

    // Fill custom listing field
    userEvent.selectOptions(screen.getByLabelText('Category'), 'kids');

    // Test that save button is enabled
    expect(screen.getByRole('button', { name: saveActionMsg })).toBeEnabled();
  });

  it('Check subcategories field filters by category field value', () => {
    const saveActionMsg = 'Save details';

    const selectableListingTypes = [
      {
        listingType: 'sell-bicycles',
        transactionProcessAlias: 'default-purchase/release-1',
        unitType: 'item',
      },
    ];

    const tablesEnumOptions = [
      {
        label: "4-Legs",
        option: "tables-4-legs"
      },
      {
        label: "3-Legs",
        option: "tables-3-legs"
      },
      {
        label: "4-Legs Wood",
        option: "tables-4-legs-wood"
      },
      {
        label: "4-Legs Metal",
        option: "tables-4-legs-metal"
      },
      {
        label: "Vintage",
        option: "tables-vintage"
      },
    ]

    const chairsEnumOptions = [
      {
        label: "4-Legs",
        option: "chairs-4-legs"
      },
      {
        label: "3-Legs",
        option: "chairs-3-legs"
      }
    ]

    const listingFieldsConfig = [
      {
        key: 'category',
        scope: 'public',
        schemaType: 'enum',
        enumOptions: [
          {
            label: 'Tables',
            option: 'tables',
          },
          {
            label: 'Chairs',
            option: 'chairs',
          },
          {
            label: 'Sofas',
            option: 'sofas',
          },
        ],
        filterConfig: {
          indexForSearch: true,
          label: 'Category',
          filterType: 'SelectMultipleFilter',
          group: 'primary',
        },
        showConfig: {
          label: 'Category',
          isDetail: true,
        },
        saveConfig: {
          label: 'Category',
          isRequired: true,
        },
        includeForListingTypes: ['sell-bicycles'],
      },
      {
        key: "subcategories",
        scope: "public",
        schemaType: "multi-enum",
        enumOptions: [
          ...tablesEnumOptions,
          ...chairsEnumOptions
        ],
        filterConfig: {
          indexForSearch: true,
          label: "Subcategories",
          filterType: "SelectMultipleFilter",
          searchMode: "has_all",
          group: "secondary"
        },
        showConfig: {
          label: "Subcategories",
          isDetail: true
        },
        saveConfig: {
          label: "Subcategories",
          isRequired: true
        },
        includeForListingTypes: ['sell-bicycles'],
      }
    ];

    render(
      <EditListingDetailsForm
        intl={fakeIntl}
        dispatch={noop}
        onSubmit={v => v}
        saveActionMsg={saveActionMsg}
        updated={false}
        updateInProgress={false}
        disabled={false}
        ready={false}
        listingFieldsConfig={listingFieldsConfig}
        selectableListingTypes={selectableListingTypes}
        hasExistingListingType={true}
        initialValues={selectableListingTypes[0]}
      />,
      {

      }
    );

    // Pickup fields
    const title = 'EditListingDetailsForm.title';
    expect(screen.getByText(title)).toBeInTheDocument();

    const description = 'EditListingDetailsForm.description';
    expect(screen.getByText(description)).toBeInTheDocument();

    const dimensions = 'EditListingDetailsForm.dimensions';
    expect(screen.getByText(dimensions)).toBeInTheDocument();

    expect(screen.queryByText('Subcategories')).not.toBeInTheDocument();

    // Test that save button is disabled at first
    expect(screen.getByRole('button', { name: saveActionMsg })).toBeDisabled();

    // Fill mandatory attributes
    userEvent.type(screen.getByRole('textbox', { name: title }), 'My Listing');
    userEvent.type(screen.getByRole('textbox', { name: description }), 'Lorem ipsum');
    userEvent.type(screen.getByRole('textbox', { name: dimensions }), 'Lorem ipsum');

    act(() => {
      // Fill custom listing field
      userEvent.selectOptions(screen.getByLabelText('Category'), 'tables');
    })

    expect(screen.getByText('Subcategories')).toBeInTheDocument();
    tablesEnumOptions.forEach(({ option }) => {
      expect(screen.getByTestId(`subcategories.${option}`)).toBeInTheDocument();
    })
    chairsEnumOptions.forEach(({ option }) => {
      expect(screen.queryByTestId(`subcategories.${option}`)).not.toBeInTheDocument()
    })

    expect(screen.getByRole('button', { name: saveActionMsg })).toBeDisabled();

    userEvent.click(screen.queryByTestId(`subcategories.tables-4-legs`));
    userEvent.click(screen.queryByTestId(`subcategories.tables-3-legs`));

    act(() => {
      // Fill custom listing field
      userEvent.selectOptions(screen.getByLabelText('Category'), 'chairs');
    })

    expect(screen.getByRole('button', { name: saveActionMsg })).toBeDisabled();

    expect(screen.getByText('Subcategories')).toBeInTheDocument();
    tablesEnumOptions.forEach(({ option }) => {
      expect(screen.queryByTestId(`subcategories.${option}`)).not.toBeInTheDocument();
    })
    chairsEnumOptions.forEach(({ option }) => {
      expect(screen.getByTestId(`subcategories.${option}`)).toBeInTheDocument()
    })

    userEvent.click(screen.queryByTestId(`subcategories.chairs-4-legs`));
    userEvent.click(screen.queryByTestId(`subcategories.chairs-3-legs`));

    // Test that save button is enabled
    expect(screen.getByRole('button', { name: saveActionMsg })).toBeEnabled();
  });
});
