import {
  StudyFiltersSubgroupsInterface,
  StudyFiltersGroupsInterface,
  StudyFiltersParamsInterface
} from '../interfaces/filters/study-filters.interface';


const studyTypes: Array<StudyFiltersParamsInterface> = [
  {
    id: 11,
    value: 'Interventional',
    name: 'Interventional',
    isSelected: true,
    translate: 'FILTERS.STUDIES.TYPES.INTERVENTIONAL',
  },
  {
    id: 12,
    value: 'Observational',
    name: 'Observational',
    isSelected: true,
    translate: 'FILTERS.STUDIES.TYPES.OBSERVATIONAL',
  },
  {
    id: 13,
    value: 'Observational patient registry',
    name: 'Observational patient registry',
    isSelected: true,
    translate: 'FILTERS.STUDIES.TYPES.OBSERVATIONAL-PATIENT-REGISTRY',
  },
  {
    id: 14,
    value: 'Expanded access',
    name: 'Expanded access',
    isSelected: true,
    translate: 'FILTERS.STUDIES.TYPES.EXPANDED-ACCESS',
  },
  {
    id: 15,
    value: 'Funded programme',
    name: 'Funded programme',
    isSelected: true,
    translate: 'FILTERS.STUDIES.TYPES.FUNDED-PROGRAMME',
  },
  {
    id: 16,
    value: 'Other',
    name: 'Other',
    isSelected: true,
    translate: 'FILTERS.STUDIES.TYPES.OTHER',
  },
  {
    id: 0,
    value: 'Not yet known',
    name: 'Not yet known',
    isSelected: true,
    translate: 'FILTERS.STUDIES.TYPES.NOT-YET-KNOWN',
  }
];

const studyStatuses: Array<any> = [
  {
    id: 11,
    value: 'Withdrawn',
    name: 'Withdrawn',
    isSelected: true,
    translate: 'FILTERS.STUDIES.STATUSES.WITHDRAWN',
  },
  {
    id: 12,
    value: 'Available',
    name: 'Available',
    isSelected: true,
    translate: 'FILTERS.STUDIES.STATUSES.AVAILABLE',
  },
  {
    id: 13,
    value: 'Withheld',
    name: 'Withheld',
    isSelected: true,
    translate: 'FILTERS.STUDIES.STATUSES.WITHHELD',
  },
  {
    id: 14,
    value: 'Recruiting',
    name: 'Recruiting',
    isSelected: true,
    translate: 'FILTERS.STUDIES.STATUSES.RECRUITING',
  },
  {
    id: 15,
    value: 'Active, not recruiting',
    name: 'Active, not recruiting',
    isSelected: true,
    translate: 'FILTERS.STUDIES.STATUSES.ACTIVE-NOT-RECRUITING',
  },
  {
    id: 16,
    value: 'Not yet recruiting',
    name: 'Not yet recruiting',
    isSelected: true,
    translate: 'FILTERS.STUDIES.STATUSES.NOT-YET-RECRUITING',
  },
  {
    id: 17,
    value: 'No longer available',
    name: 'No longer available',
    isSelected: true,
    translate: 'FILTERS.STUDIES.STATUSES.NO-LONGER-AVAILABLE',
  },
  {
    id: 18,
    value: 'Suspended',
    name: 'Suspended',
    isSelected: true,
    translate: 'FILTERS.STUDIES.STATUSES.SUSPENDED',
  },
  {
    id: 19,
    value: 'Enrolling by invitation',
    name: 'Enrolling by invitation',
    isSelected: true,
    translate: 'FILTERS.STUDIES.STATUSES.ENROLLING-BY-INVITATION',
  },
  {
    id: 20,
    value: 'Approved for marketing',
    name: 'Approved for marketing',
    isSelected: true,
    translate: 'FILTERS.STUDIES.STATUSES.APPROVED-FOR-MARKETING',
  },
  {
    id: 21,
    value: 'Completed',
    name: 'Completed',
    isSelected: true,
    translate: 'FILTERS.STUDIES.STATUSES.COMPLETED',
  },
  {
    id: 22,
    value: 'Terminated',
    name: 'Terminated',
    isSelected: true,
    translate: 'FILTERS.STUDIES.STATUSES.TERMINATED',
  },
  {
    id: 24,
    value: 'Other',
    name: 'Other',
    isSelected: true,
    translate: 'FILTERS.STUDIES.STATUSES.OTHER',
  },
  {
    id: 25,
    value: 'Ongoing',
    name: 'Ongoing',
    isSelected: true,
    translate: 'FILTERS.STUDIES.STATUSES.ONGOING',
  },
  {
    id: 0,
    value: 'Unknown status',
    name: 'Unknown status',
    isSelected: true,
    translate: 'FILTERS.STUDIES.STATUSES.UNKNOWN-STATUS',
  }
];

const genderEligibility: Array<StudyFiltersParamsInterface> = [
  {
    id: 900,
    value: 'All',
    name: 'All',
    isSelected: true,
    translate: 'FILTERS.STUDIES.GENDER.ALL',
  },
  {
    id: 905,
    value: 'Female',
    name: 'Female',
    isSelected: true,
    translate: 'FILTERS.STUDIES.GENDER.FEMALE',
  },
  {
    id: 910,
    value: 'Male',
    name: 'Male',
    isSelected: true,
    translate: 'FILTERS.STUDIES.GENDER.MALE',
  },
  {
    id: 0,
    value: 'Unknown status',
    name: 'Unknown status',
    isSelected: true,
    translate: 'FILTERS.STUDIES.GENDER.UNKNOWN-STATUS',
  },
  {
    id: 915,
    value: 'Not provided',
    name: 'Not provided',
    isSelected: true,
    translate: 'FILTERS.STUDIES.GENDER.NOT-PROVIDED',
  }
];

const StudyFiltersGeneral: Array<StudyFiltersSubgroupsInterface> = [
  {
    id: 1,
    subgroupName: 'Type',
    checkboxName: 'study_type',
    isSelected: true,
    translate: 'FILTERS.STUDIES.TYPES.TITLE',
    fieldName: 'study_type.id',
    isNested: false,
    path: 'study_type',
    values: studyTypes,
    type: 'study'
  },
  {
    id: 2,
    subgroupName: 'Status',
    checkboxName: 'study_status',
    isSelected: true,
    translate: 'FILTERS.STUDIES.STATUSES.TITLE',
    fieldName: 'study_status.id',
    isNested: false,
    path: 'study_status',
    values: studyStatuses,
    type: 'study'
  },
  {
    id: 3,
    subgroupName: 'Gender eligibility',
    checkboxName: 'gender_elig',
    isSelected: true,
    translate: 'FILTERS.STUDIES.GENDER.TITLE',
    fieldName: 'study_gender_elig.id',
    isNested: false,
    path: 'study_gender_elig',
    values: genderEligibility,
    type: 'study'
  }
];


const studyPhase: Array<StudyFiltersParamsInterface> = [
  {
    id: 100,
    name: 'Not applicable',
    value: 'Not applicable',
    isSelected: true,
    translate: 'FILTERS.STUDIES.PHASES.NOT-APPLICABLE',
  },
  {
    id: 105,
    name: 'Early phase 1',
    value: 'Early phase 1',
    isSelected: true,
    translate: 'FILTERS.STUDIES.PHASES.EARLY-PHASE-1',
  },
  {
    id: 110,
    name: 'Phase 1',
    value: 'Phase 1',
    isSelected: true,
    translate: 'FILTERS.STUDIES.PHASES.PHASE-1',
  },
  {
    id: 115,
    name: 'Phase 1/2',
    value: 'Phase 1/2',
    isSelected: true,
    translate: 'FILTERS.STUDIES.PHASES.PHASE-1-2',
  },
  {
    id: 120,
    name: 'Phase 2',
    value: 'Phase 2',
    isSelected: true,
    translate: 'FILTERS.STUDIES.PHASES.PHASE-2',
  },
  {
    id: 125,
    name: 'Phase 2/3',
    value: 'Phase 2/3',
    isSelected: true,
    translate: 'FILTERS.STUDIES.PHASES.PHASE-2-3',
  },
  {
    id: 130,
    name: 'Phase 3',
    value: 'Phase 3',
    isSelected: true,
    translate: 'FILTERS.STUDIES.PHASES.PHASE-3',
  },
  {
    id: 135,
    name: 'Phase 4',
    value: 'Phase 4',
    isSelected: true,
    translate: 'FILTERS.STUDIES.PHASES.PHASE-4',
  },
  {
    id: 140,
    name: 'Not provided',
    value: 'Not provided',
    isSelected: true,
    translate: 'FILTERS.STUDIES.PHASES.NOT-PROVIDED',
  }
];

const interventionalModel: Array<StudyFiltersParamsInterface> = [
  {
    id: 300,
    name: 'Single group assignment',
    value: 'Single group assignment',
    isSelected: true,
    translate: 'FILTERS.STUDIES.INTERVENTIONAL-MODELS.SINGLE-GROUP-ASSIGNMENT',
  },
  {
    id: 305,
    name: 'Parallel assignment',
    value: 'Parallel assignment',
    isSelected: true,
    translate: 'FILTERS.STUDIES.INTERVENTIONAL-MODELS.PARALLEL-ASSIGNMENT',
  },
  {
    id: 310,
    name: 'Crossover assignment',
    value: 'Crossover assignment',
    isSelected: true,
    translate: 'FILTERS.STUDIES.INTERVENTIONAL-MODELS.CROSSOVER-ASSIGNMENT',
  },
  {
    id: 315,
    name: 'Factorial assignment',
    value: 'Factorial assignment',
    isSelected: true,
    translate: 'FILTERS.STUDIES.INTERVENTIONAL-MODELS.FACTORIAL-ASSIGNMENT',
  },
  {
    id: 320,
    name: 'Sequential assignment',
    value: 'Sequential assignment',
    isSelected: true,
    translate: 'FILTERS.STUDIES.INTERVENTIONAL-MODELS.SEQUENTIAL-ASSIGNMENT',
  },
  {
    id: 325,
    name: 'Not provided',
    value: 'Not provided',
    isSelected: true,
    translate: 'FILTERS.STUDIES.INTERVENTIONAL-MODELS.NOT-PROVIDED',
  }
];

const allocationType: Array<StudyFiltersParamsInterface> = [
  {
    id: 200,
    name: 'Not applicable',
    value: 'Not applicable',
    isSelected: true,
    translate: 'FILTERS.STUDIES.ALLOCATION-TYPES.NOT-APPLICABLE',
  },
  {
    id: 205,
    name: 'Randomised',
    value: 'Randomised',
    isSelected: true,
    translate: 'FILTERS.STUDIES.ALLOCATION-TYPES.RANDOMISED',
  },
  {
    id: 210,
    name: 'Nonrandomised',
    value: 'Nonrandomised',
    isSelected: true,
    translate: 'FILTERS.STUDIES.ALLOCATION-TYPES.NONRANDOMISED',
  },
  {
    id: 215,
    name: 'Not provided',
    value: 'Not provided',
    isSelected: true,
    translate: 'FILTERS.STUDIES.ALLOCATION-TYPES.NOT-PROVIDED',
  }
];

const primaryPurpose: Array<StudyFiltersParamsInterface> = [
  {
    id: 400,
    name: 'Treatment',
    value: 'Treatment',
    isSelected: true,
    translate: 'FILTERS.STUDIES.PRIMARY-PURPOSES.TREATMENT',
  },
  {
    id: 405,
    name: 'Prevention',
    value: 'Prevention',
    isSelected: true,
    translate: 'FILTERS.STUDIES.PRIMARY-PURPOSES.PREVENTION',
  },
  {
    id: 410,
    name: 'Diagnostic',
    value: 'Diagnostic',
    isSelected: true,
    translate: 'FILTERS.STUDIES.PRIMARY-PURPOSES.DIAGNOSTIC',
  },
  {
    id: 415,
    name: 'Supportive care',
    value: 'Supportive care',
    isSelected: true,
    translate: 'FILTERS.STUDIES.PRIMARY-PURPOSES.SUPPORTIVE-CARE',
  },
  {
    id: 420,
    name: 'Screening',
    value: 'Screening',
    isSelected: true,
    translate: 'FILTERS.STUDIES.PRIMARY-PURPOSES.SCREENING',
  },
  {
    id: 425,
    name: 'Health services research',
    value: 'Health services research',
    isSelected: true,
    translate: 'FILTERS.STUDIES.PRIMARY-PURPOSES.HEALTH-SERVICE-RESEARCH',
  },
  {
    id: 430,
    name: 'Basic science',
    value: 'Basic science',
    isSelected: true,
    translate: 'FILTERS.STUDIES.PRIMARY-PURPOSES.BASIC-SCIENCE',
  },
  {
    id: 435,
    name: 'Device feasibility',
    value: 'Device feasibility',
    isSelected: true,
    translate: 'FILTERS.STUDIES.PRIMARY-PURPOSES.DEVICE-FEASIBILITY',
  },
  {
    id: 450,
    name: 'Educational / counselling / training',
    value: 'Educational / counselling / training',
    isSelected: true,
    translate: 'FILTERS.STUDIES.PRIMARY-PURPOSES.EDUCATIONAL-COUNSELLING-TRAINING',
  },
  {
    id: 440,
    name: 'Other',
    value: 'Other',
    isSelected: true,
    translate: 'FILTERS.STUDIES.PRIMARY-PURPOSES.OTHER',
  },
  {
    id: 445,
    name: 'Not provided',
    value: 'Not provided',
    isSelected: true,
    translate: 'FILTERS.STUDIES.PRIMARY-PURPOSES.NOT-PROVIDED',
  }
];

const masking: Array<StudyFiltersParamsInterface> = [
  {
    id: 500,
    name: 'None (Open Label)',
    value: 'None (Open Label)',
    isSelected: true,
    translate: 'FILTERS.STUDIES.MASKING.NONE',
  },
  {
    id: 502,
    name: 'Blinded (no details)',
    value: 'Blinded (no details)',
    isSelected: true,
    translate: 'FILTERS.STUDIES.MASKING.BLINDED',
  },
  {
    id: 505,
    name: 'Single',
    value: 'Single',
    isSelected: true,
    translate: 'FILTERS.STUDIES.MASKING.SINGLE',
  },
  {
    id: 510,
    name: 'Double',
    value: 'Double',
    isSelected: true,
    translate: 'FILTERS.STUDIES.MASKING.DOUBLE',
  },
  {
    id: 515,
    name: 'Triple',
    value: 'Triple',
    isSelected: true,
    translate: 'FILTERS.STUDIES.MASKING.TRIPLE',
  },
  {
    id: 520,
    name: 'Quadruple',
    value: 'Quadruple',
    isSelected: true,
    translate: 'FILTERS.STUDIES.MASKING.QUADRUPLE',
  },
  {
    id: 522,
    name: 'Not applicable',
    value: 'Not applicable',
    isSelected: true,
    translate: 'FILTERS.STUDIES.MASKING.NOT-APPLICABLE',
  },
  {
    id: 525,
    name: 'Not provided',
    value: 'Not provided',
    isSelected: true,
    translate: 'FILTERS.STUDIES.MASKING.NOT-PROVIDED',
  }
];

const StudyFiltersInterventional: Array<StudyFiltersSubgroupsInterface> = [
  {
    id: 1,
    subgroupName: 'Phase',
    checkboxName: 'phase',
    isSelected: true,
    values: studyPhase,
    translate: 'FILTERS.STUDIES.PHASES.TITLE',
    fieldName: 'study_features.feature_value.id',
    path: 'study_features',
    isNested: true,
    type: 'study'
  },
  {
    id: 2,
    subgroupName: 'Intervention model',
    checkboxName: 'intervention_model',
    isSelected: true,
    translate: 'FILTERS.STUDIES.INTERVENTIONAL-MODELS.TITLE',
    values: interventionalModel,
    fieldName: 'study_features.feature_value.id',
    path: 'study_features',
    isNested: true,
    type: 'study'
  },
  {
    id: 3,
    subgroupName: 'Allocation type',
    checkboxName: 'allocation_type',
    isSelected: true,
    translate: 'FILTERS.STUDIES.ALLOCATION-TYPES.TITLE',
    values: allocationType,
    fieldName: 'study_features.feature_value.id',
    path: 'study_features',
    isNested: true,
    type: 'study'
  },
  {
    id: 4,
    subgroupName: 'Primary purpose',
    checkboxName: 'primary_purpose',
    isSelected: true,
    translate: 'FILTERS.STUDIES.PRIMARY-PURPOSES.TITLE',
    values: primaryPurpose,
    fieldName: 'study_features.feature_value.id',
    path: 'study_features',
    isNested: true,
    type: 'study'
  },
  {
    id: 5,
    subgroupName: 'Masking',
    checkboxName: 'masking',
    isSelected: true,
    translate: 'FILTERS.STUDIES.MASKING.TITLE',
    values: masking,
    fieldName: 'study_features.feature_value.id',
    path: 'study_features',
    isNested: true,
    type: 'study'
  },
];


const observationalModel: Array<StudyFiltersParamsInterface> = [
  {
    id: 600,
    name: 'Cohort',
    value: 'Cohort',
    isSelected: true,
    translate: 'FILTERS.STUDIES.OBSERVATIONAL-MODELS.COHORT',
  },
  {
    id: 605,
    name: 'Case-control',
    value: 'Case-control',
    isSelected: true,
    translate: 'FILTERS.STUDIES.OBSERVATIONAL-MODELS.CASE-CONTROL',
  },
  {
    id: 610,
    name: 'Case-only',
    value: 'Case-only',
    isSelected: true,
    translate: 'FILTERS.STUDIES.OBSERVATIONAL-MODELS.CASE-ONLY',
  },
  {
    id: 615,
    name: 'Case-crossover',
    value: 'Case-crossover',
    isSelected: true,
    translate: 'FILTERS.STUDIES.OBSERVATIONAL-MODELS.CASE-CROSSOVER',
  },
  {
    id: 620,
    name: 'Ecologic or community study',
    value: 'Ecologic or community study',
    isSelected: true,
    translate: 'FILTERS.STUDIES.OBSERVATIONAL-MODELS.ECOLOGIC-OR-COMMUNITY-STUDY',
  },
  {
    id: 625,
    name: 'Family-based',
    value: 'Family-based',
    isSelected: true,
    translate: 'FILTERS.STUDIES.OBSERVATIONAL-MODELS.FAMILY-BASED',
  },
  {
    id: 640,
    name: 'Defined population',
    value: 'Defined population',
    isSelected: true,
    translate: 'FILTERS.STUDIES.OBSERVATIONAL-MODELS.DEFINED-POPULATION',
  },
  {
    id: 645,
    name: 'Natural history',
    value: 'Natural history',
    isSelected: true,
    translate: 'FILTERS.STUDIES.OBSERVATIONAL-MODELS.NATURAL-HISTORY',
  },
  {
    id: 630,
    name: 'Other',
    value: 'Other',
    isSelected: true,
    translate: 'FILTERS.STUDIES.OBSERVATIONAL-MODELS.OTHER',
  },
  {
    id: 635,
    name: 'Not provided',
    value: 'Not provided',
    isSelected: true,
    translate: 'FILTERS.STUDIES.OBSERVATIONAL-MODELS.NOT-PROVIDED',
  }
];

const timePerspective: Array<StudyFiltersParamsInterface> = [
  {
    id: 700,
    name: 'Retrospective',
    value: 'Retrospective',
    isSelected: true,
    translate: 'FILTERS.STUDIES.TIME-PERSPECTIVE.RETROSPECTIVE',
  },
  {
    id: 705,
    name: 'Prospective',
    value: 'Prospective',
    isSelected: true,
    translate: 'FILTERS.STUDIES.TIME-PERSPECTIVE.PROSPECTIVE',
  },
  {
    id: 710,
    name: 'Cross-sectional',
    value: 'Cross-sectional',
    isSelected: true,
    translate: 'FILTERS.STUDIES.TIME-PERSPECTIVE.CROSS-SECTIONAL',
  },
  {
    id: 725,
    name: 'Retrospective / prospective',
    value: 'Retrospective / prospective',
    isSelected: true,
    translate: 'FILTERS.STUDIES.TIME-PERSPECTIVE.RETROSPECTIVE-PROSPECTIVE',
  },
  {
    id: 730,
    name: 'Longitudinal',
    value: 'Longitudinal',
    isSelected: true,
    translate: 'FILTERS.STUDIES.TIME-PERSPECTIVE.LONGITUDINAL',
  },
  {
    id: 715,
    name: 'Other',
    value: 'Other',
    isSelected: true,
    translate: 'FILTERS.STUDIES.TIME-PERSPECTIVE.OTHER',
  },
  {
    id: 720,
    name: 'Not provided',
    value: 'Not provided',
    isSelected: true,
    translate: 'FILTERS.STUDIES.TIME-PERSPECTIVE.NOT-PROVIDED',
  }
];

const biospecimensRetained: Array<StudyFiltersParamsInterface> = [
  {
    id: 800,
    name: 'None retained',
    value: 'None retained',
    isSelected: true,
    translate: 'FILTERS.STUDIES.BIOSPECIMENS-RETAINED.NONE',
  },
  {
    id: 805,
    name: 'Samples with DNA',
    value: 'Samples with DNA',
    isSelected: true,
    translate: 'FILTERS.STUDIES.BIOSPECIMENS-RETAINED.SAMPLES-WITH-DNA',
  },
  {
    id: 810,
    name: 'Samples without DNA',
    value: 'Samples without DNA',
    isSelected: true,
    translate: 'FILTERS.STUDIES.BIOSPECIMENS-RETAINED.SAMPLES-WITHOUT-DNA',
  },
  {
    id: 815,
    name: 'Not provided',
    value: 'Not provided',
    isSelected: true,
    translate: 'FILTERS.STUDIES.BIOSPECIMENS-RETAINED.NOT-PROVIDED',
  }
];

const StudyFiltersObservational: Array<StudyFiltersSubgroupsInterface> = [
  {
    id: 1,
    subgroupName: 'Observational model',
    checkboxName: 'observational_model',
    isSelected: true,
    translate: 'FILTERS.STUDIES.OBSERVATIONAL-MODELS.TITLE',
    values: observationalModel,
    fieldName: 'study_features.feature_value.id',
    path: 'study_features',
    isNested: true,
    type: 'study'
  },
  {
    id: 2,
    subgroupName: 'Time perspective',
    checkboxName: 'time_perspective',
    isSelected: true,
    translate: 'FILTERS.STUDIES.TIME-PERSPECTIVE.TITLE',
    values: timePerspective,
    fieldName: 'study_features.feature_value.id',
    path: 'study_features',
    isNested: true,
    type: 'study'
  },
  {
    id: 3,
    subgroupName: 'Biospecimens retained',
    checkboxName: 'biospecimens_retained',
    isSelected: true,
    translate: 'FILTERS.STUDIES.BIOSPECIMENS-RETAINED.TITLE',
    values: biospecimensRetained,
    fieldName: 'study_features.feature_value.id',
    path: 'study_features',
    isNested: true,
    type: 'study'
  },
];


export const StudyFilters: Array<StudyFiltersGroupsInterface> = [
  {
    id: 1,
    groupName: 'General studies filter',
    translate: 'FILTERS.STUDIES.GROUPS-TITLES.GENERAL-STUDIES',
    subgroups: StudyFiltersGeneral,
  },
  {
    id: 2,
    groupName: 'Interventional studies filter',
    translate: 'FILTERS.STUDIES.GROUPS-TITLES.INTERVENTIONAL-STUDIES',
    subgroups: StudyFiltersInterventional,
  },
  {
    id: 3,
    groupName: 'Observational studies filters',
    translate: 'FILTERS.STUDIES.GROUPS-TITLES.OBSERVATIONAL-STUDIES',
    subgroups: StudyFiltersObservational,
  }
];
