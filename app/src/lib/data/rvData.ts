export const sampleRVData = [
  { 
    make: "Winnebago", 
    models: ["Voyage", "Minnie Winnie", "View"] 
  },
  { 
    make: "Airstream", 
    models: ["Classic", "Basecamp", "Interstate"] 
  },
  { 
    make: "Jayco", 
    models: ["Eagle", "Melbourne", "Redhawk"] 
  },
  { 
    make: "Thor Motor Coach", 
    models: ["Magnitude", "Chateau", "Delano"] 
  },
  { 
    make: "Forest River", 
    models: ["Sunseeker", "Georgetown", "FR3"] 
  }
];

export const getModelsByMake = (make: string): string[] => {
  const rvMake = sampleRVData.find(rv => rv.make === make);
  return rvMake ? rvMake.models : [];
};

export const getAllMakes = (): string[] => {
  return sampleRVData.map(rv => rv.make);
};

export const getAllModels = (): string[] => {
  return sampleRVData.flatMap(rv => rv.models);
};

export const getYears = (): number[] => {
  const currentYear = new Date().getFullYear();
  const years: number[] = [];
  
  // Generate years from current year down to 1980
  for (let year = currentYear; year >= 1980; year--) {
    years.push(year);
  }
  
  return years;
};
