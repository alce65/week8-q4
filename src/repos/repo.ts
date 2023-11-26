export interface Repository<X extends { id: unknown }> {
  getAll(): Promise<X[]>;
  getById(_id: X['id']): Promise<X>;
  // eslint-disable-next-line no-unused-vars
  search({ key, value }: { key: keyof X; value: unknown }): Promise<X[]>;
  create(_newItem: Omit<X, 'id'>): Promise<X>;
  update(_id: X['id'], _updatedItem: Partial<X>): Promise<X>;
  delete(_id: X['id']): Promise<void>;
  addFriend(_id: X['id'], _updatedItem: Partial<X>): Promise<X>;
  addEnemy(_id: X['id'], _updatedItem: Partial<X>): Promise<X>;
  removeFriend(_id: X['id'], _friendIdToRemove: Partial<X>): Promise<X>;
  removeEnemy(_id: X['id'], _enemyIdToRemove: Partial<X>): Promise<X>;
}
