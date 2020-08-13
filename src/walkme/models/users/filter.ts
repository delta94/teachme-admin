export type UsersTableQueryFilter = {
  /**
   * Filter results to users starting with this string
   * @default undefined
   */
  user_name?: string;
  /**
   * Filter results to specific courses
   * @default undefined
   */
  course_id?: Array<number>;
  /**
   * Filter results according to course completion
   * @default undefined
   */
  course_completed?: boolean;
  /**
   * Filter results according to quiz pass
   * @default undefined
   */
  quiz_passed?: boolean;
};
