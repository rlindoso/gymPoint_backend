import * as Yup from 'yup';

import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fail.' });
    }

    const studentExistis = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExistis) {
      return res.status(400).json({ error: 'Student already exists.' });
    }

    const { id, name, email, idade, altura } = await Student.create(req.body);

    return res.json({ id, name, email, idade, altura });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      idade: Yup.integer(),
      peso: Yup.double(),
      altura: Yup.double(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fail.' });
    }

    const { email } = req.body;

    const student = await Student.findByPk(req.studentId);

    if (email !== student.email) {
      const studentExistis = await Student.findOne({
        where: { email },
      });

      if (studentExistis) {
        return res.status(400).json({ error: 'Student already exists.' });
      }
    }

    const { id, name, idade, altura } = await student.update(req.body);

    return res.json({ id, name, email, idade, altura });
  }
}

export default new StudentController();
