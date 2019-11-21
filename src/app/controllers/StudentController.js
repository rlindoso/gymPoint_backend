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

    const { id, name, email, idade, peso, altura } = await Student.create(
      req.body
    );

    return res.json({ id, name, email, idade, peso, altura });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      idade: Yup.number().integer(),
      peso: Yup.number(),
      altura: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fail.' });
    }

    const { email } = req.body;

    const student = await Student.findByPk(req.body.studentId);

    if (student == null) {
      return res.status(400).json({ error: 'Student does not exists.' });
    }

    if (email !== student.email) {
      const studentExistis = await Student.findOne({
        where: { email },
      });

      if (studentExistis) {
        return res.status(400).json({ error: 'Student already exists.' });
      }
    }

    const { id, name, idade, peso, altura } = await student.update(req.body);

    return res.json({ id, name, email, idade, peso, altura });
  }
}

export default new StudentController();
