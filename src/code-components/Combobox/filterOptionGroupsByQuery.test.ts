import { describe, expect, it } from "vitest";
import { filterOptionGroupsByQuery } from "./filterOptionGroupsByQuery";
import { OptionGroup } from "./Combobox";

const groups: OptionGroup[] = [
  {
    options: [
      { value: "o1" },
      { value: "o2", label: "Option 2" },
      { value: "o3", description: "Option 3 with description" },
    ],
  },
  {
    name: "g1",
    options: [
      {
        value: "group 1, o1",
      },
      {
        value: "group 1, o2",
      },
    ],
  },
  {
    name: "g2",
    options: [
      {
        value: "group 2, o1",
      },
      {
        value: "group 2, o2",
      },
    ],
  },
];

describe(filterOptionGroupsByQuery.name, () => {
  it("does nothing if no query", () => {
    expect(filterOptionGroupsByQuery(groups, "")).toEqual(groups);
  });

  it("if option has no label, filters by value", () => {
    expect(filterOptionGroupsByQuery(groups, "o1")).toMatchInlineSnapshot(`
      [
        {
          "options": [
            {
              "value": "o1",
            },
          ],
        },
        {
          "name": "g1",
          "options": [
            {
              "value": "group 1, o1",
            },
          ],
        },
        {
          "name": "g2",
          "options": [
            {
              "value": "group 2, o1",
            },
          ],
        },
      ]
    `);
  });

  it("if option has label, filters by label, not value", () => {
    expect(filterOptionGroupsByQuery(groups, "option 2"))
      .toMatchInlineSnapshot(`
        [
          {
            "options": [
              {
                "label": "Option 2",
                "value": "o2",
              },
            ],
          },
        ]
      `);

    expect(filterOptionGroupsByQuery(groups, "o2")).toMatchInlineSnapshot(`
      [
        {
          "name": "g1",
          "options": [
            {
              "value": "group 1, o2",
            },
          ],
        },
        {
          "name": "g2",
          "options": [
            {
              "value": "group 2, o2",
            },
          ],
        },
      ]
    `);
  });

  it("filters by description", () => {
    expect(filterOptionGroupsByQuery(groups, "with description"))
      .toMatchInlineSnapshot(`
        [
          {
            "options": [
              {
                "description": "Option 3 with description",
                "value": "o3",
              },
            ],
          },
        ]
      `);
  });

  it("if matches group name, all its options are returned", () => {
    expect(filterOptionGroupsByQuery(groups, "g1")).toMatchInlineSnapshot(`
      [
        {
          "name": "g1",
          "options": [
            {
              "value": "group 1, o1",
            },
            {
              "value": "group 1, o2",
            },
          ],
        },
      ]
    `);
  });
});
