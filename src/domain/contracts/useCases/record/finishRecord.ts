
export interface FinishingRecord {
    execute(request: FinishingRecord.Input): Promise<void>;
}
export namespace FinishingRecord {
    export type Input = { id: number }
}