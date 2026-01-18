import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true });

export const skillSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    description: { type: 'string' },
    version: { type: 'string' },
    categories: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          children: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' }
              },
              required: ['id', 'name']
            }
          }
        },
        required: ['id', 'name', 'children']
      }
    },
    tags: { type: 'array', items: { type: 'string' } },
    entry: {
      type: 'object',
      properties: {
        type: { type: 'string' },
        ref: { type: 'string' }
      },
      required: ['type', 'ref']
    }
  },
  required: ['id', 'name', 'description', 'version', 'categories', 'tags', 'entry']
};

export const skillsPackageSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    displayName: { type: 'string' },
    version: { type: 'string' },
    description: { type: 'string' },
    provider: { type: 'string' },
    license: { type: 'string' },
    homepage: { type: 'string' },
    skills: { type: 'array', items: { type: 'string' } },
    categories: { type: 'array', items: { type: 'string' } },
    dependencies: { type: 'object' },
    engines: {
      type: 'object',
      properties: {
        agent: { type: 'string' },
        mcp: { type: 'string' }
      },
      required: ['agent', 'mcp']
    }
  },
  required: ['name', 'displayName', 'version', 'description', 'provider', 'license', 'skills', 'dependencies', 'engines']
};

export const validateSkill = ajv.compile(skillSchema);
export const validateSkillsPackage = ajv.compile(skillsPackageSchema);
