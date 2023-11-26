package main

import (
	"database/sql"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	_ "github.com/lib/pq"
)

var db *sql.DB

func init() {
	var err error
	// Инициализация базы данных, замени параметры подключения на свои
	db, err = sql.Open("postgres", "host=212.233.121.159 port=5432 user=urbatron password=q1q1q1q1 dbname=urbatron sslmode=disable")
	if err != nil {
		log.Fatal(err)
	}
}

func main() {
	app := fiber.New()
	app.Use(cors.New())

	app.Get("/api", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	app.Get("/student/:uuid", func(c *fiber.Ctx) error {
		uuid := c.Params("uuid")
		student, err := getStudentByUUID(uuid)
		if err != nil {
			return c.Status(500).SendString("Internal Server Error")
		}
		return c.JSON(student)
	})

	app.Get("/teacher-lessons/:uuid", func(c *fiber.Ctx) error {
		uuid := c.Params("uuid")
		teacherLessons, err := getTeacherLessonsByUUID(uuid)
		if err != nil {
			return c.Status(500).SendString("Internal Server Error")
		}
		return c.JSON(teacherLessons)
	})

	app.Get("/student-lessons/:uuid", func(c *fiber.Ctx) error {
		uuid := c.Params("uuid")
		studentLessons, err := getStudentLessonsByUUID(uuid)
		if err != nil {
			return c.Status(500).SendString("Internal Server Error")
		}
		return c.JSON(studentLessons)
	})

	app.Get("/news", func(c *fiber.Ctx) error {
		newsList, err := getNews()
		if err != nil {
			return c.Status(500).SendString("Internal Server Error")
		}
		return c.JSON(newsList)
	})

	app.Get("/teacher/:uuid", func(c *fiber.Ctx) error {
		uuid := c.Params("uuid")
		teacher, err := getTeacherByUUID(uuid)
		if err != nil {
			return c.Status(500).SendString("Internal Server Error")
		}
		return c.JSON(teacher)
	})

	log.Fatal(app.Listen(":3000"))
}

func getStudentByUUID(uuid string) (interface{}, error) {
	var student struct {
		StudentID             string `json:"student_id"`
		StudentName           string `json:"student_name"`
		Address               string `json:"address"`
		BirthDate             string `json:"birth_date"`
		Phone                 string `json:"phone"`
		EmergencyContactPhone string `json:"emergency_contact_phone"`
		EmergencyContact      string `json:"emergency_contact"`
		Instrument            string `json:"instrument"`
		ProgramName           string `json:"program_name"`
		Email                 string `json:"email"`
	}

	// Здесь ты должен использовать запрос к базе данных для выбора данных по uuid
	row := db.QueryRow("SELECT * FROM students_v WHERE student_id = $1", uuid)

	err := row.Scan(
		&student.StudentID,
		&student.StudentName,
		&student.Address,
		&student.BirthDate,
		&student.Phone,
		&student.EmergencyContactPhone,
		&student.EmergencyContact,
		&student.Instrument,
		&student.ProgramName,
		&student.Email,
	)

	if err != nil {
		log.Println(err)
		return nil, err
	}

	return student, nil
}

func getNews() ([]interface{}, error) {
	rows, err := db.Query("SELECT * FROM news")
	if err != nil {
		log.Printf("Error fetching news from the database: %v", err)
		return nil, err
	}
	defer func(rows *sql.Rows) {
		err := rows.Close()
		if err != nil {

		}
	}(rows)

	var newsList []interface{}
	for rows.Next() {
		var news struct {
			NewsID   string `json:"news_id"`
			Title    string `json:"title"`
			Content  string `json:"content"`
			PostDate string `json:"post_date"`
			Tag      string `json:"tag"`
		}

		err := rows.Scan(
			&news.NewsID,
			&news.Title,
			&news.Content,
			&news.PostDate,
			&news.Tag,
		)

		if err != nil {
			log.Printf("Error scanning news row: %v", err)
			return nil, err
		}

		newsList = append(newsList, news)
	}

	if err := rows.Err(); err != nil {
		log.Printf("Error iterating over news rows: %v", err)
		return nil, err
	}

	return newsList, nil
}

func getTeacherByUUID(uuid string) (interface{}, error) {
	var teacher struct {
		TeacherID       string `json:"teacher_id"`
		TeacherName     string `json:"teacher_name"`
		Address         string `json:"address"`
		BirthDate       string `json:"birth_date"`
		Phone           string `json:"phone"`
		Education       string `json:"education"`
		Email           string `json:"email"`
		ExperienceYears int    `json:"experience_years"`
		Role            string `json:"role"`
	}

	row := db.QueryRow("SELECT * FROM teachers_v WHERE teacher_id = $1", uuid)

	err := row.Scan(
		&teacher.TeacherID,
		&teacher.TeacherName,
		&teacher.Address,
		&teacher.BirthDate,
		&teacher.Phone,
		&teacher.Education,
		&teacher.Email,
		&teacher.ExperienceYears,
		&teacher.Role,
	)

	if err != nil {
		log.Printf("Error fetching teacher by UUID from the database: %v", err)
		return nil, err
	}

	return teacher, nil
}

func getStudentLessonsByUUID(uuid string) ([]interface{}, error) {
	rows, err := db.Query("SELECT * FROM student_lessons_v WHERE student_id = $1", uuid)
	if err != nil {
		log.Printf("Error fetching student lessons from the database: %v", err)
		return nil, err
	}
	defer rows.Close()

	var studentLessonsList []interface{}
	for rows.Next() {
		var studentLesson struct {
			StudentName string `json:"student_name"`
			SubjectName string `json:"subject_name"`
			DaysOfWeek  string `json:"days_of_week"`
			TimeStart   string `json:"time_start"`
			TimeEnd     string `json:"time_end"`
			CabinetNum  string `json:"cabinet_num"`
			IsOnetime   bool   `json:"is_onetime"`
			StudentID   string `json:"student_id"`
			SubjectID   string `json:"subject_id"`
			ValidFrom   string `json:"valid_from"`
			ValidUntil  string `json:"valid_until"`
			IsImportant bool   `json:"is_important"`
		}

		err := rows.Scan(
			&studentLesson.StudentName,
			&studentLesson.SubjectName,
			&studentLesson.DaysOfWeek,
			&studentLesson.TimeStart,
			&studentLesson.TimeEnd,
			&studentLesson.CabinetNum,
			&studentLesson.IsOnetime,
			&studentLesson.StudentID,
			&studentLesson.SubjectID,
			&studentLesson.ValidFrom,
			&studentLesson.ValidUntil,
			&studentLesson.IsImportant,
		)

		if err != nil {
			log.Printf("Error scanning student lesson row: %v", err)
			return nil, err
		}

		studentLessonsList = append(studentLessonsList, studentLesson)
	}

	if err := rows.Err(); err != nil {
		log.Printf("Error iterating over student lessons rows: %v", err)
		return nil, err
	}

	return studentLessonsList, nil
}

func getTeacherLessonsByUUID(uuid string) ([]interface{}, error) {
	rows, err := db.Query("SELECT * FROM teacher_lessons_v WHERE teacher_id = $1", uuid)
	if err != nil {
		log.Printf("Error fetching teacher lessons from the database: %v", err)
		return nil, err
	}
	defer rows.Close()

	var teacherLessonsList []interface{}
	for rows.Next() {
		var teacherLesson struct {
			TeacherName string `json:"teacher_name"`
			SubjectName string `json:"subject_name"`
			DaysOfWeek  string `json:"days_of_week"`
			TimeStart   string `json:"time_start"`
			TimeEnd     string `json:"time_end"`
			CabinetNum  string `json:"cabinet_num"`
			IsOnetime   bool   `json:"is_onetime"`
			TeacherID   string `json:"teacher_id"`
			SubjectID   string `json:"subject_id"`
			ValidFrom   string `json:"valid_from"`
			ValidUntil  string `json:"valid_until"`
			IsImportant bool   `json:"is_important"`
		}

		err := rows.Scan(
			&teacherLesson.TeacherName,
			&teacherLesson.SubjectName,
			&teacherLesson.DaysOfWeek,
			&teacherLesson.TimeStart,
			&teacherLesson.TimeEnd,
			&teacherLesson.CabinetNum,
			&teacherLesson.IsOnetime,
			&teacherLesson.TeacherID,
			&teacherLesson.SubjectID,
			&teacherLesson.ValidFrom,
			&teacherLesson.ValidUntil,
			&teacherLesson.IsImportant,
		)

		if err != nil {
			log.Printf("Error scanning teacher lesson row: %v", err)
			return nil, err
		}

		teacherLessonsList = append(teacherLessonsList, teacherLesson)
	}

	if err := rows.Err(); err != nil {
		log.Printf("Error iterating over teacher lessons rows: %v", err)
		return nil, err
	}

	return teacherLessonsList, nil
}
