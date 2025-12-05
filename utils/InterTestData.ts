export class InterTestData {
  private data: Record<string, any> = {};

  setTestData(key: string, value: any) {
    this.data[key] = value;
  }

  getTestData(key: string): any {
    return this.data[key];
  }

  clearTestData() {
    this.data = {};
  }
}

export const testData = new InterTestData(); 
